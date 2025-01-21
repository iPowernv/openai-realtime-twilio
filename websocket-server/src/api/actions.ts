// src/api/actions.ts

import api from './apiServer';
import { Action } from '../types/Action';
import { PaginatedResult, PaginationParameters } from '../types/PaginatedResult';

/**
 * Fetches paginated actions from the backend.
 */
export const getActions = async (
  params: PaginationParameters
): Promise<PaginatedResult<Action>> => {
  const response = await api.get<PaginatedResult<Action>>('/actions', { params });
  return response.data;
};

/**
 * Fetches all actions from the backend.
 */
export const getAllActions = async (): Promise<Action[]> => {
  const response = await api.get<PaginatedResult<Action>>('/actions', {
    params: { pageNumber: 1, pageSize: 1000 },
  });
  return response.data.items;
};

/**
 * Fetches a single action by its ID.
 */
export const getActionById = async (id: number): Promise<Action> => {
  const response = await api.get<Action>(`/actions/${id}`);
  return response.data;
};

/**
 * Creates a new action.
 */
export const createAction = async (action: Partial<Action>): Promise<Action> => {
  const response = await api.post<Action>('/actions', action);
  return response.data;
};

/**
 * Updates an existing action.
 */
export const updateAction = async (id: number, action: Partial<Action>): Promise<Action> => {
  const response = await api.put<Action>(`/actions/${id}`, action);
  return response.data;
};

/**
 * Deletes an action by ID.
 */
export const deleteAction = async (id: number): Promise<void> => {
  await api.delete(`/actions/${id}`);
};

