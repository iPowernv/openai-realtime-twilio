// src/api/tickets.ts

import api from './apiServer'; // Import the Axios instance with interceptors
import { TicketReadDTO, TicketQueryParameters, TicketWriteDTO } from '../types/Ticket';
import { PaginatedResult } from '../types/PaginatedResult';
import qs from 'qs';

/**
 * Fetches tickets from the backend with optional query parameters.
 * @param params - The query parameters.
 */
export const getTickets = async (params: TicketQueryParameters) => {
  const response = await api.get<PaginatedResult<TicketReadDTO>>('/tickets', {
    params,
    // 2) Hier geef je expliciet aan hoe arrays moeten worden geserialized
    paramsSerializer: (p: TicketQueryParameters) => qs.stringify(p, { arrayFormat: 'repeat' }),
  });

  return {
    data: response.data.items,
    totalCount: response.data.totalCount,
    totalPages: response.data.totalPages,
  };
};


/**
 * Haalt de historische summary van een ticket op.
 * @param ticketID het TicketID
 * @returns de summary (string)
 */
export const getTicketHistorySummary = async (ticketID: number): Promise<string> => {
  const response = await api.get<string>(`/tickets/${ticketID}/history-summary`);
  return response.data;
};

/**
 * Updates tickets in bulk based on the selected action.
 * @param ticketIDs - Array of ticket IDs to update.
 * @param action - The action to perform.
 * @param customerRepID - The ID of the logged-in customer representative.
 */
export const updateTicketsBulk = async (
  ticketIDs: number[],
  action: string,
  customerRepID: number
): Promise<void> => {
  await api.put('/tickets/bulk', {
    ticketIDs,
    action,
    customerRepID,
  });
};

/**
 * Fetches a single ticket by its ID.
 * @param id - The ID of the ticket to fetch.
 * @returns A promise that resolves to the TicketReadDTO object.
 */
export const getTicketById = async (id: number): Promise<TicketReadDTO> => {
  const response = await api.get<TicketReadDTO>(`/tickets/${id}`);
  return response.data;
};

/**
 * Updates an existing ticket.
 * @param id - The ID of the ticket to update.
 * @param ticket - The data to update the ticket with.
 * @returns A promise that resolves when the update is complete.
 */
export const updateTicket = async (id: number, ticket: TicketWriteDTO): Promise<void> => {
  await api.put(`/tickets/${id}`, ticket);
};

/**
 * Creates a new ticket.
 * @param ticket - The data for the new ticket.
 * @returns A promise that resolves to the created TicketReadDTO object.
 */
export const createTicket = async (ticket: TicketWriteDTO): Promise<TicketReadDTO> => {
  console.log(createTicket)
  const response = await api.post<TicketReadDTO>('/tickets', ticket);
  return response.data;
};

/**
 * Deletes a ticket by its ID.
 * @param id - The ID of the ticket to delete.
 * @returns A promise that resolves when the deletion is complete.
 */
export const deleteTicket = async (id: number): Promise<void> => {
  await api.delete(`/tickets/${id}`);
};

