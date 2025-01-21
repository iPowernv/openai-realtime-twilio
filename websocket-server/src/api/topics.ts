// src/api/topics.ts

import api from './apiServer';
import { TopicDTO } from '../types/Topic';
import { PaginatedResult, PaginationParameters } from '../types/PaginatedResult';


/**
 * Fetches paginated topics from the backend.
 * @param params - Pagination parameters.
 * @returns Promise resolving to a PaginatedResult of TopicDTO objects.
 */
export const getTopics = async (params: PaginationParameters): Promise<PaginatedResult<TopicDTO>> => {
  const response = await api.get<PaginatedResult<TopicDTO>>('/topics', { params });
  return response.data;
};

/**
 * Fetches all topics from the backend by setting pageSize to a large number.
 * @returns Promise resolving to an array of TopicDTO objects.
 */
export const getAllTopics = async (): Promise<TopicDTO[]> => {
  const paginationParams: PaginationParameters = {
    pageNumber: 1,
    pageSize: 1000, // Set a large number to fetch all topics
    sortBy: 'name',
    sortOrder: 'asc',
  };

  const response = await api.get<PaginatedResult<TopicDTO>>('/topics', { params: paginationParams });
  return response.data.items;
};

/**
 * Creates a new topic.
 * @param topic - Partial Topic object containing the necessary fields.
 * @returns Promise resolving to the created Topic object.
 */
export const createTopic = async (topic: Partial<TopicDTO>): Promise<TopicDTO> => {
  const response = await api.post<TopicDTO>('/topics', topic);
  return response.data;
};

/**
 * Updates an existing topic.
 * @param id - The ID of the topic to update.
 * @param topic - Partial Topic object containing the updated fields.
 * @returns Promise resolving to the updated Topic object.
 */
export const updateTopic = async (id: number, topic: Partial<TopicDTO>): Promise<TopicDTO> => {
  const response = await api.put<TopicDTO>(`/topics/${id}`, topic);
  return response.data;
};

/**
 * Deletes a topic by ID.
 * @param id - The ID of the topic to delete.
 * @returns Promise resolving when the deletion is complete.
 */
export const deleteTopic = async (id: number): Promise<void> => {
  await api.delete(`/topics/${id}`);
};
