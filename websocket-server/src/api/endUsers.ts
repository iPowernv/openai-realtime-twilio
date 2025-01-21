// src/api/endUsers.ts

import api from './apiServer';
import { EndUserReadDTO, EndUserCreateDTO, EndUserUpdateDTO, AssignUIDRequest } from '../types/EndUser';
import { PaginatedResult } from '../types/PaginatedResult'; // Eventueel toevoegen
import { TicketQueryParameters, TicketReadDTO } from '../types/Ticket';

/**
 * 1) Haal EndUsers op met paginering, sortering en optionele search-query.
 */
export const getEndUsersPaginated = async ({
  search,
  pageNumber = 1,
  pageSize = 10,
  sortBy,
  sortOrder = 'asc'
}: {
  search?: string;
  pageNumber?: number;
  pageSize?: number;
  sortBy?: string;
  sortOrder?: string;
}) => {
  const params = new URLSearchParams();
  if (search) params.append('search', search);
  params.append('PageNumber', pageNumber.toString());
  params.append('PageSize', pageSize.toString());
  if (sortBy) params.append('SortBy', sortBy);
  params.append('SortOrder', sortOrder);

  // Voorbeeld: GET /api/EndUsers?PageNumber=1&PageSize=10&search=john&SortBy=Firstname&SortOrder=asc
  const response = await api.get<PaginatedResult<EndUserReadDTO>>(`/endUsers?${params.toString()}`);
  return response.data; // { items, totalCount, totalPages }
};

/**
 * 2) Haal EndUsers op aan de hand van hun UID (bestond al).
 */
export const getEndUsersByUid = async (uid: string) => {
  const response = await api.get<EndUserReadDTO[]>(`/endUsers/byUid/${encodeURIComponent(uid)}`);
  return response.data;
};

/**
 * 3) Maak (POST) een nieuwe EndUser aan.
 */
export const createEndUser = async (dto: EndUserCreateDTO) => {
  const response = await api.post<EndUserReadDTO>('/endUsers', dto);
  return response.data;
};

/**
 * Gets a single EndUser by ID (GET /api/EndUsers/{id}).
 */
export const getEndUser = async (id: number) => {
  // Let op: In je .NET-controller is de route: GET api/EndUsers/{id}
  const response = await api.get<EndUserReadDTO>(`/EndUsers/${id}`);
  return response.data;
};


/**
 * 4) Update (PUT) een bestaande EndUser (inclusief UIDs).
 */
export const updateEndUser = async (id: number, dto: EndUserUpdateDTO) => {
  await api.put(`/endUsers/${id}`, dto);
  // Geen data terug, je kunt desgewenst de API ook EndUserReadDTO laten retourneren
};

/**
 * 5) Verwijder (DELETE) een bestaande EndUser.
 */
export const deleteEndUser = async (id: number) => {
  await api.delete(`/endUsers/${id}`);
};

/** Roep de assign-actie aan */
export const assignUIDToEndUser = async (dto: AssignUIDRequest) => {
  // POST /api/EndUserUIDs/assign
  const response = await api.post(`/endUserUIDs/assign`, dto);
  return response.data;
};

export const getTicketsByEndUserId = async (
  endUserId: number,
  params: TicketQueryParameters
): Promise<PaginatedResult<TicketReadDTO>> => {
  // Voorbeeld: GET /api/EndUsers/123/tickets?search=...&pageNumber=...
  const response = await api.get<PaginatedResult<TicketReadDTO>>(
    `/endUsers/${endUserId}/tickets`,
    { params }
  );
  return response.data;
};