// src/api/topicDocuments.ts

import api from './apiServer'; // Use your Axios instance with interceptors
import { PaginatedResult } from '../types/PaginatedResult';
import { TopicDocumentReadDTO } from '../types/TopicDocument';
import { TopicDocumentCreateDTO } from '../types/TopicDocument';

/**
 * Fetches all TopicDocuments for a specific Topic with pagination and sorting.
 * @param topicId - The ID of the Topic.
 * @returns Promise resolving to a PaginatedResult of TopicDocumentReadDTO.
 */
export const getTopicDocumentsByTopicId = async (
  topicId: number,
  pageNumber: number,
  pageSize: number,
  sortBy: string,
  sortDirection: string
): Promise<PaginatedResult<TopicDocumentReadDTO>> => {
  const response = await api.get('/topicdocuments', {
    params: {
      topicId,
      pageNumber,
      pageSize,
      sortBy,
      sortDirection,
    },
  });
  return response.data;
};

/**
 * Creates a new TopicDocument linkage.
 * @param topicDocument - The data for the new linkage.
 * @returns Promise resolving to the created TopicDocumentReadDTO.
 */
export const createTopicDocument = async (topicDocument: TopicDocumentCreateDTO): Promise<TopicDocumentReadDTO> => {
  const response = await api.post<TopicDocumentReadDTO>('/topicdocuments', topicDocument);
  return response.data;
};

/**
 * Deletes a TopicDocument.
 * @param id - The ID of the TopicDocument to delete.
 * @returns Promise resolving when the deletion is complete.
 */
export const deleteTopicDocument = async (id: number): Promise<void> => {
  await api.delete(`/topicdocuments/${id}`);
};

/**
 * Fetches all TopicDocuments for a specific Document with pagination and sorting.
 * @param documentId - The ID of the Document.
 * @returns Promise resolving to a PaginatedResult of TopicDocumentReadDTO.
 */
export const getTopicDocumentsByDocumentId = async (
  documentId: number,
  pageNumber: number,
  pageSize: number,
  sortBy: string,
  sortDirection: string
): Promise<PaginatedResult<TopicDocumentReadDTO>> => {
  const response = await api.get('/topicdocuments', {
    params: {
      documentId,
      pageNumber,
      pageSize,
      sortBy,
      sortDirection,
    },
  });
  return response.data;
};