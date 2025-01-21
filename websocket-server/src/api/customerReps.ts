// src/api/customerReps.ts

import api from './apiServer';
import {
  CustomerRepCreateDTO,
  CustomerRepReadDTO,
  CustomerRepUpdateDTO,
  CustomerRepSignature
} from '../types/CustomerRep';
import { PaginatedResult } from '../types/PaginatedResult';

export const getCustomerRepsPaginated = async (
  pageNumber: number,
  pageSize: number
): Promise<PaginatedResult<CustomerRepReadDTO>> => {
  const response = await api.get('/customerReps', {
    params: { pageNumber, pageSize },
  });
  return response.data;
};
export const getCustomerReps = async (): Promise<CustomerRepReadDTO[]> => {
  const response = await api.get('/customerReps', {
    params: { pageNumber: 1, pageSize: 999999 }
  });
  // We willen alleen items teruggeven zodat we een array krijgen.
  return response.data.items;
};

export const getCustomerRep = async (id: number): Promise<CustomerRepReadDTO> => {
  const response = await api.get(`/customerReps/${id}`);
  return response.data;
};

export const createCustomerRep = async (data: CustomerRepCreateDTO): Promise<CustomerRepReadDTO> => {
  const response = await api.post('/customerReps', data);
  return response.data;
};

export const updateCustomerRep = async (id: number, data: CustomerRepUpdateDTO): Promise<void> => {
  await api.put(`/customerReps/${id}`, data);
};

export const deleteCustomerRep = async (id: number): Promise<void> => {
  await api.delete(`/customerReps/${id}`);
};

export const changeCustomerRepPassword = async (
  customerRepID: number,
  newPassword: string
): Promise<void> => {
  await api.put(`/customerReps/${customerRepID}/change-password`, {
    customerRepID,
    newPassword,
  });
};

export const getCustomerRepSignatures = async (
  customerRepId: number
): Promise<CustomerRepSignature[]> => {
  const response = await api.get(`/customerReps/${customerRepId}/signatures`);
  return response.data;
};

export const getCustomerRepSignature = async (
  customerRepId: number,
  lang: string
): Promise<CustomerRepSignature> => {
  const response = await api.get(`/customerReps/${customerRepId}/signatures/${lang}`);
  return response.data;
};

export const upsertCustomerRepSignature = async (
  customerRepId: number,
  lang: string,
  emailSignatureHTML?: string,
  emailSignatureText?: string
): Promise<CustomerRepSignature> => {
  const response = await api.post(`/customerReps/${customerRepId}/signatures`, {
    lang,
    emailSignatureHTML,
    emailSignatureText
  });
  return response.data;
};

export const deleteCustomerRepSignature = async (
  customerRepId: number,
  lang: string
): Promise<void> => {
  await api.delete(`/customerReps/${customerRepId}/signatures/${lang}`);
};