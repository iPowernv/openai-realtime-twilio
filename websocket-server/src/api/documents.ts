// src/api/documents.ts

import api from './apiServer';
import { Document } from '../types/Document';
import { PaginatedResult, PaginationParameters } from '../types/PaginatedResult';


/**
 * Fetches all documents from the backend.
 * @returns Promise resolving to an array of Document objects.
 */
export const getAllDocuments = async (
  params: PaginationParameters
): Promise<PaginatedResult<Document>> => {
  const response = await api.get<PaginatedResult<Document>>('/documents', { params });
  return response.data;
};

export const getAllDocumentsUnpaginated  = async (): Promise<Document[]> => {
  const response = await api.get<PaginatedResult<Document>>('/documents', {
    params: { pageNumber: 1, pageSize: 1000 },
  });
  return response.data.items;
};


/**
 * Fetches a single document by its ID.
 * @param id - The ID of the document to fetch.
 * @returns Promise resolving to the Document object.
 */
export const getDocumentById = async (id: number, replacePlaceholders : boolean=false): Promise<Document> => {
  const response = await api.get<Document>(`/documents/${id}?replacePlaceholders=${replacePlaceholders}`);
  return response.data;
};

/**
 * Creates a new document.
 * @param document - Partial Document object containing the necessary fields.
 * @returns Promise resolving to the created Document object.
 */
export const createDocument = async (document: Partial<Document>): Promise<Document> => {
  const response = await api.post<Document>('/documents', document);
  return response.data;
};

/**
 * Updates an existing document.
 * @param id - The ID of the document to update.
 * @param document - Partial Document object containing the updated fields.
 * @returns Promise resolving to the updated Document object.
 */
export const updateDocument = async (id: number, document: Partial<Document>): Promise<Document> => {
  const response = await api.put<Document>(`/documents/${id}`, document);
  return response.data;
};

/**
 * Deletes a document by ID.
 * @param id - The ID of the document to delete.
 * @returns Promise resolving when the deletion is complete.
 */
export const deleteDocument = async (id: number): Promise<void> => {
  await api.delete(`/documents/${id}`);
};
