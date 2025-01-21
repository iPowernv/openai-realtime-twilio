// src/api/topicActions.ts

import api from './apiServer';
import { PaginatedResult } from '../types/PaginatedResult';
import { TopicActionReadDTO, TopicActionCreateDTO, TopicActionUpdateDTO } from '../types/TopicAction';

/**
 * Fetches TopicActions with optional filters and pagination.
 */
export const getTopicActions = async (
  params: {
    topicId?: number;
    actionId?: number;
    pageNumber?: number;
    pageSize?: number;
    sortBy?: string;
    sortOrder?: string;
  } = {}
): Promise<PaginatedResult<TopicActionReadDTO>> => {
  const response = await api.get('/topicactions', { params });
  return response.data;
};

/**
 * Creates a new TopicAction.
 */
export const createTopicAction = async (
  topicAction: TopicActionCreateDTO
): Promise<TopicActionReadDTO> => {
  const response = await api.post<TopicActionReadDTO>('/topicactions', topicAction);
  return response.data;
};

/**
 * Deletes a TopicAction by ID.
 */
export const deleteTopicAction = async (id: number): Promise<void> => {
  await api.delete(`/topicactions/${id}`);
};

/**
 * Bulk creates TopicActions.
 */
export const createBulkTopicActions = async (
  topicActions: TopicActionCreateDTO[]
): Promise<TopicActionReadDTO[]> => {
  const response = await api.post<TopicActionReadDTO[]>('/topicactions/bulk', topicActions);
  return response.data;
};


export const updateTopicAction = async (
    id: number,
    data: Partial<TopicActionUpdateDTO>
  ): Promise<TopicActionReadDTO> => {
    const response = await api.put<TopicActionReadDTO>(`/topicactions/${id}`, data);
    return response.data;
  };
  