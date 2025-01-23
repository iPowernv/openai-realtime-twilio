// src/api/ticketMessages.ts

import api from './apiServer';
import {
  TicketMessageReadDTO,
  TicketMessageQueryParameters,
  TicketMessageDetailDTO,
  AddTopicRequest,
  RemoveTopicRequest,
  TicketMessageUpdateDTO,
  // De extra types:
  SendMessageDTO,
  ExecuteActionRequest,
  ExecuteActionResponse,
  TicketMessageCreateDTO,
  LikeDislikeResponse,
  EscalateRequest
} from '../types/TicketMessage';
import { PaginatedResult } from '../types/PaginatedResult';
import { PromptDocsExtendedDTO } from '../types/PromptDocument';

/**
 * Fetches ticket messages with pagination.
 * @param ticketId - The ID of the ticket.
 * @param params - Query parameters for pagination and filtering.
 */
export const getTicketMessages = async (
  ticketId: number,
  params: TicketMessageQueryParameters
) => {
  const response = await api.get<PaginatedResult<TicketMessageReadDTO>>('/ticketMessages', {
    params: { ticketId, ...params },
  });
  return response.data;
};

/**
 * Fetches the details of a single ticket message.
 * @param messageId - The ID of the message.
 */
export const getTicketMessageById = async (messageId: number) => {
  const response = await api.get<TicketMessageDetailDTO>(`/ticketMessages/${messageId}`);
  return response.data;
};

/**
 * Adds a topic to a ticket message.
 * @param request - The request object containing messageID, topicID, and customerRepID.
 */
export const addTopicToMessage = async (request: AddTopicRequest) => {
  const response = await api.post('/ticketMessageTopics', request);
  return response.data;
};

  /**
 * Removes a topic from a ticket message.
 * @param request - The request object containing ticketMessageTopicID and customerRepID.
 */
export const removeTopicFromMessage = async (request: RemoveTopicRequest) => {
  const response = await api.delete('/ticketMessageTopics', { data: request });
  return response.data;
};

/**
 * Updates the topics of a ticket message.
 * @param messageId - The ID of the message.
 * @param topicIds - Array of topic IDs to assign.
 * @param customerRepID - The ID of the customer representative making the change.
 */
export const updateTicketMessageTopics = async (
  messageId: number,
  topicIds: number[]
) => {
  const response = await api.post(`/ticketMessages/${messageId}/correct-topics`, {
    topicIds
  });
  return response.data;
};

/**
 * Fetches prompt documents for a given ticket message.
 * @param messageId - The ID of the message.
 */
export const getPromptDocumentsByMessageId = async (messageId: number,onlyPromptDocuments:boolean=false): Promise<PromptDocsExtendedDTO> => {
  const response = await api.get<PromptDocsExtendedDTO>(`/ticketMessages/${messageId}/promptDocuments?onlyPromptDocuments=${onlyPromptDocuments}`);
  return response.data;
};




/**
 * Updates a ticket message.
 * @param messageId - The ID of the message.
 * @param messageData - The updated message data.
 */
export const updateTicketMessage = async (messageId: number, messageData: TicketMessageUpdateDTO) => {
  const response = await api.put(`/ticketMessages/${messageId}`, messageData);
  return response.data;
};

/**
 * Fetches custom field definitions for a ticket message.
 * @param id - The ID of the ticket message.
 */
export const executeCustomFieldDefinitions = async (messageId: number): Promise<void> => {
  await api.post(`/ticketMessages/${messageId}/execute-custom-field-definitions`);
};

export const importEmailsForCustomer = async (): Promise<void> => {
  await api.post('/ticketMessages/import-emails');
};

/**
 * Generate (or regenerate) an AI reply for a given message.
 * This calls POST /ticketMessages/{id}/reply
 * 
 * @param messageId - The ID of the message
 */
export const generateAiReply = async (messageId: number): Promise<string> => {
  const response= await api.post(`/ticketMessages/${messageId}/reply`);
  return response.data.reply;
};

/**
 * Send the already generated AI reply.
 * Optionally provide a modifiedAnswer. If different from AI_GeneratedResponse,
 * it will be saved as AI_ModifiedResponse.
 * 
 * POST /ticketMessages/{id}/send
 * 
 * @param messageId - The ID of the message
 * @param data - { modifiedAnswer?: string }
 */
export const sendReply = async (messageId: number, data: SendMessageDTO): Promise<void> => {
  await api.post(`/ticketMessages/${messageId}/send`, data);
};

/**
 * Execute a specific Action by ID on the given message.
 * POST /ticketMessages/{id}/execute-action
 * 
 * @param messageId - The ID of the message
 * @param request - { actionID: number }
 * @returns { message: string, finished: boolean }
 */
export const executeActionOnMessage = async (
  messageId: number,
  request: ExecuteActionRequest
): Promise<ExecuteActionResponse> => {
  const response = await api.post<ExecuteActionResponse>(
    `/ticketMessages/${messageId}/execute-action`,
    request
  );
  return response.data;
};

/**
 * Generate an AI reply using additional info.
 * This calls POST /ticketMessages/{id}/reply-with-info
 * 
 * @param messageId - The ID of the message
 * @param additionalInfo - Optional extra info that the user wants to provide
 */
export const generateAiReplyWithInfo = async (
  messageId: number,
  additionalInfo?: string,
  overrideModelID?: number
): Promise<void> => {
  await api.post(`/ticketMessages/${messageId}/reply-with-info`, {
    additionalInfo,
    overrideModelID, // <-- extra field
  });
};


/**
 * Returns the final HTML (body + signature, no tracking pixel) from the backend
 */
export const previewReply = async (messageId: number): Promise<string> => {
  const response = await api.post<{ preview: string }>(`/ticketMessages/${messageId}/preview`);
  return response.data.preview;
};

import { TicketMessageAttachmentDTO } from '../types/TicketMessage';

/**
 * Haalt alle attachments op van een bepaalde ticketMessage.
 */
export const getMessageAttachments = async (
  messageId: number
): Promise<TicketMessageAttachmentDTO[]> => {
  const response = await api.get<TicketMessageAttachmentDTO[]>(
    `/ticketMessages/${messageId}/attachments`
  );
  return response.data;
};

/**
 * Verwijdert een attachment.
 */
export const deleteMessageAttachment = async (
  messageId: number,
  attachmentId: number
): Promise<void> => {
  // DELETE /ticketMessages/{id}/attachments/{attachmentId}
  await api.delete(`/ticketMessages/${messageId}/attachments/${attachmentId}`);
};

/**
 * Upload een attachment (door de CustomerRep).
 * @param messageId - het MessageID
 * @param file - de File (uit de file input)
 */
export const uploadMessageAttachment = async (
  messageId: number,
  file: File
): Promise<TicketMessageAttachmentDTO> => {
  const formData = new FormData();
  formData.append('file', file);

  // POST /ticketMessages/{id}/attachments
  const response = await api.post<TicketMessageAttachmentDTO>(
    `/ticketMessages/${messageId}/attachments`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );
  return response.data;
};

/**
 * Maakt een nieuw ticketmessage (optioneel in bestaand Ticket) via POST /ticketMessages/create-new
 * Returns: TicketMessageDetailDTO 
 */
export const createTicketMessage = async (
  data: TicketMessageCreateDTO
): Promise<TicketMessageDetailDTO> => {
  const response = await api.post<TicketMessageDetailDTO>('/ticketMessages/create-new', data);
  return response.data;
};


/**
 * Escaleer een ticketMessage op basis van ticketToken (anonieme flow).
 * 
 * POST /ticketMessages/{ticketToken}/escalate
 */
export const escalateTicketMessageByToken = async (
  ticketToken: string,
  data: EscalateRequest
): Promise<string> => {
  const response = await api.post(`/ticketMessages/${ticketToken}/escalate`, data);
  return response.data.message;
};

/**
 * Escaleer een ticketMessage op basis van messageId (ingelogde flow).
 * 
 * POST /ticketMessages/{messageId}/escalate-by-id
 */
export const escalateTicketMessageById = async (
  messageId: number,
  data: EscalateRequest | null
): Promise<string> => {
  // Als data null of undefined is, stuur een leeg object
  const payload = data || {};

  // Axios zal dit dan als JSON posten i.p.v. x-www-form-urlencoded
  const response = await api.post(`/ticketMessages/${messageId}/escalate-by-id`, payload);

  return response.data.message;
};

/**
 * Like/dislike een bericht via ticketToken.
 * 
 * GET /ticketMessages/{ticketToken}/like-dislike?like=true/false
 * Returns: { agentAvailable: boolean, customerRepName: string }
 */
export const likeOrDislikeMessage = async (
  ticketToken: string,
  like: boolean
): Promise<LikeDislikeResponse> => {
  const response = await api.get<LikeDislikeResponse>(
    `/ticketMessages/${ticketToken}/like-dislike`,
    {
      params: { like },
    }
  );
  return response.data;
};