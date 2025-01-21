import api from './apiServer';
import {
  PageTopicMappingReadDTO,
  PageTopicMappingCreateDTO,
  PageTopicMappingUpdateDTO,
} from '../types/PageTopicMapping';
import { PaginatedResult } from '../types/PaginatedResult';

export const getPageTopicMappingsPaged = async (
  params: {
    pageNumber?: number;
    pageSize?: number;
    sortBy?: string;
    sortOrder?: string;
  } = {}
): Promise<PaginatedResult<PageTopicMappingReadDTO>> => {
  const response = await api.get('/pageTopicMappings', { params });
  return response.data;
};

export const getPageTopicMappingById = async (
  id: number
): Promise<PageTopicMappingReadDTO> => {
  const response = await api.get<PageTopicMappingReadDTO>(`/pageTopicMappings/${id}`);
  return response.data;
};

export const createPageTopicMapping = async (
  data: PageTopicMappingCreateDTO
): Promise<PageTopicMappingReadDTO> => {
  const response = await api.post<PageTopicMappingReadDTO>('/pageTopicMappings', data);
  return response.data;
};

export const updatePageTopicMapping = async (
  id: number,
  data: PageTopicMappingUpdateDTO
): Promise<void> => {
  await api.put(`/pageTopicMappings/${id}`, data);
};

export const deletePageTopicMapping = async (id: number): Promise<void> => {
  await api.delete(`/pageTopicMappings/${id}`);
};
