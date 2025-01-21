// src/api/channelTranslations.ts

import { ChannelTranslationsCreateDTO, ChannelTranslationsReadDTO, ChannelTranslationsUpdateDTO } from '../types/ChannelTranslations';
import api from './apiServer';

// GET all translations for a channel
export async function getChannelTranslationsByChannel(channelID: number): Promise<ChannelTranslationsReadDTO[]> {
    const resp = await api.get<ChannelTranslationsReadDTO[]>(`/channelTranslations/byChannel/${channelID}`);
    return resp.data;
  }
  
  // GET single
  export async function getChannelTranslation(id: number): Promise<ChannelTranslationsReadDTO> {
    const resp = await api.get<ChannelTranslationsReadDTO>(`/channelTranslations/${id}`);
    return resp.data;
  }
  
  // POST create
  export async function createChannelTranslation(dto: ChannelTranslationsCreateDTO): Promise<ChannelTranslationsReadDTO> {
    const resp = await api.post<ChannelTranslationsReadDTO>('/channelTranslations', dto);
    return resp.data;
  }
  
  // PUT update
  export async function updateChannelTranslation(
    id: number,
    dto: ChannelTranslationsUpdateDTO
  ): Promise<void> {
    await api.put(`/channelTranslations/${id}`, dto);
  }
  
  // DELETE
  export async function deleteChannelTranslation(id: number): Promise<void> {
    await api.delete(`/channelTranslations/${id}`);
  }