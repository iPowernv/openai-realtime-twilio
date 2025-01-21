// src/api/translate.ts
import api from './apiServer';

export interface TranslateRequest {
    sourceText: string;
    targetLang: string;
  }
  
  /** Roept de backend aan om de tekst te vertalen. */
  export const translateText = async (
    sourceText: string,
    targetLang: string
  ): Promise<string> => {
    const response = await api.post<string>('/translations/translate', {
      sourceText,
      targetLang,
    });
    return response.data; // De backend geeft direct de vertaalde tekst als string terug
  };