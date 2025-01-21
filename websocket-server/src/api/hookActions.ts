// src/api/hookActions.ts

import api from './apiServer';
import { PaginatedResult } from '../types/PaginatedResult';
import { HookActionReadDTO, HookActionCreateDTO, HookActionUpdateDTO } from '../types/HookAction';

/**
 * Fetches HookActions with optional pagination & sorting.
 * Must pass ?hookName=xxx to filter the correct hook.
 */
export const getHookActions = async (
  hookName: string,
  params: {
    pageNumber?: number;
    pageSize?: number;
    sortBy?: string;
    sortOrder?: string;
  } = {}
): Promise<PaginatedResult<HookActionReadDTO>> => {
  const response = await api.get('/hookactions', {
    params: {
      hookName, 
      ...params
    }
  });
  return response.data;
};

/**
 * Creates a new HookAction.
 */
export const createHookAction = async (
  hookAction: HookActionCreateDTO
): Promise<HookActionReadDTO> => {
  const response = await api.post<HookActionReadDTO>('/hookactions', hookAction);
  return response.data;
};

/**
 * Updates only Priority for an existing HookAction
 */
export const updateHookAction = async (
  id: number,
  data: Partial<HookActionUpdateDTO>
): Promise<void> => {
  await api.put(`/hookactions/${id}`, data);
};

/**
 * Deletes a HookAction by ID.
 */
export const deleteHookAction = async (id: number): Promise<void> => {
  await api.delete(`/hookactions/${id}`);
};

/**
 * Bulk creates HookActions.
 */
export const createBulkHookActions = async (
  hookActions: HookActionCreateDTO[]
): Promise<HookActionReadDTO[]> => {
  const response = await api.post<HookActionReadDTO[]>('/hookactions/bulk', hookActions);
  return response.data;
};
