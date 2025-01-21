// src/api/api-server.ts (een Node-versie)
import axios from 'axios';
import dotenv from 'dotenv';
import { session } from '../sessionManager';
import https from 'https';
import jwt from 'jsonwebtoken';

dotenv.config();

const agent = new https.Agent({
  rejectUnauthorized: false, // verifieert het self-signed cert niet
});

const api = axios.create({
  baseURL: 'https://localhost:7284/api',
  httpsAgent: agent,
});

const baseURL = process.env.VITE_API_BASE_URL;
const fixedCode = process.env.PHONE_FIXED_CODE;

// Interceptors in Node:
api.interceptors.request.use((config) => {
  // Lees token uit session, of globale var
  if (session.apiToken && config.headers) {
    config.headers.Authorization = `Bearer ${session.apiToken}`;
  }
  return config;
});

// Response interceptor:
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // In Node kun je bv. hernieuw inloggen of token clearen:
      console.log("Token is invalid/expired");
      session.apiToken = undefined;
    }
    return Promise.reject(error);
  }
);

export async function phoneLoginServer(phoneNumber: string): Promise<string> {
  console.log(fixedCode);  
  console.log(baseURL);
  const response = await api.post('/auth/phone-login', {
    customerToken: fixedCode,
    phoneNumber: phoneNumber
    });
    
    session.apiToken = response.data.token; // of session.apiToken = token;

    const token = response.data.token;
    session.apiToken = token;
  
    // Decode JWT
    const decoded = jwt.decode(token) as any; 
    // (Of: jwt.verify(token, knownSecret) als je server het secret heeft.)
  
    if (decoded) {
      // channelID en openAIKey opslaan in session
      session.channelID  = decoded.ChannelID || 0;
      session.openAIApiKey  = decoded.OpenAIKey || ""; 
    }



    return response.data.token;
}

export default api;
