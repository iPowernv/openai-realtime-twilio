import api from './apiServer';
import { ChannelFolder, MailboxFolderDTO } from '../types/ChannelFolder';

/**
 * Fetch all folders for a given channel.
 * @param channelID The channel ID.
 */
export async function getChannelFolders(channelID: number): Promise<ChannelFolder[]> {
  const response = await api.get<ChannelFolder[]>(`/channelFolders/byChannel/${channelID}`);
  return response.data;
}

/**
 * Fetch a single folder by its ID.
 * @param id The folder ID.
 */
export async function getChannelFolderById(id: number): Promise<ChannelFolder> {
  const response = await api.get<ChannelFolder>(`/channelFolders/${id}`);
  return response.data;
}

/**
 * Create a new folder.
 * @param folder Partial folder data.
 */
export async function createChannelFolder(folder: Partial<ChannelFolder>): Promise<ChannelFolder> {
  const response = await api.post<ChannelFolder>('/channelFolders', folder);
  return response.data;
}

/**
 * Update an existing folder.
 * @param id The folder ID.
 * @param folder Partial folder data.
 */
export async function updateChannelFolder(id: number, folder: Partial<ChannelFolder>): Promise<ChannelFolder> {
  const response = await api.put<ChannelFolder>(`/channelFolders/${id}`, folder);
  return response.data;
}

/**
 * Delete a folder by ID.
 * @param id The folder ID.
 */
export async function deleteChannelFolder(id: number): Promise<void> {
  await api.delete(`/channelFolders/${id}`);
}

/**
 * Fetch mailbox folders for a given channel from the mailbox provider (Graph).
 * @param channelID The channel ID.
 */
export async function getMailboxFoldersFromChannel(channelID: number): Promise<MailboxFolderDTO[]> {
  // <MailboxFolderDTO[]> in de generics
  const response = await api.get<MailboxFolderDTO[]>(`/channelFolders/fromMailbox/${channelID}`);
  return response.data;
}