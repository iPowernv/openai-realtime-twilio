// src/api/channels.ts

import api from './apiServer';
import { Channel } from '../types/Channel';

/**
 * Fetches all channels from the backend.
 * @returns Promise resolving to an array of Channel objects.
 */
export const getAllChannels = async (): Promise<Channel[]> => {
  const response = await api.get<Channel[]>('/channels');
  return response.data;
};

/**
 * Fetches a single channel by its ID.
 * @param id - The ID of the channel to fetch.
 * @returns Promise resolving to the Channel object.
 */
export const getChannelById = async (id: number): Promise<Channel> => {
  const response = await api.get<Channel>(`/channels/${id}`);
  return response.data;
};

/**
 * Creates a new channel.
 * @param channel - Partial Channel object containing the necessary fields.
 * @returns Promise resolving to the created Channel object.
 */
export const createChannel = async (channel: Partial<Channel>): Promise<Channel> => {
  const response = await api.post<Channel>('/channels', channel);
  return response.data;
};

/**
 * Updates an existing channel.
 * @param id - The ID of the channel to update.
 * @param channel - Partial Channel object containing the updated fields.
 * @returns Promise resolving to the updated Channel object.
 */
export const updateChannel = async (id: number, channel: Partial<Channel>): Promise<Channel> => {
  const response = await api.put<Channel>(`/channels/${id}`, channel);
  return response.data;
};

/**
 * Deletes a channel by ID.
 * @param id - The ID of the channel to delete.
 * @returns Promise resolving when the deletion is complete.
 */
export const deleteChannel = async (id: number): Promise<void> => {
  await api.delete(`/channels/${id}`);
};
