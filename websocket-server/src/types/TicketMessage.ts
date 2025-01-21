// src/types/TicketMessage.ts

import { CustomFieldDefinitionDTO } from "./CustomFieldDefinitionDTO";

export interface TicketMessageReadDTO {
  messageID: number;
  ticketID: number;
  dateCreated: string;
  senderType: string;
  customerRepID?: number;
  message?: string;
  subject?: string;
  fromAddress?: string;
  toAddress?: string;
  fromName?: string;
  isOpened?: boolean;
  messageDate?: string;
  uid?: string;
  status?: string;
  channelID?: number;
  preview?: string;
  pageScreenshot?: string;
  pageURL?: string;
  htmlBody?: string;
  textBody?: string;
  hasAttachment?: boolean;
  isEscalated?: boolean;      // Nieuw
  aI_FeedbackComment?: string; // Nieuw
  topics?: {
    ticketMessageTopicID: number;
    topicName: string;
  }[];
}

export interface TicketMessageQueryParameters {
  pageNumber?: number;
  pageSize?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  // Add other filters if needed
}

export interface TicketMessageCreateDTO {
  /**
   * Optioneel: als TicketID bestaat, komt de message in dat Ticket.
   * Anders zal de server een nieuw Ticket maken.
   */
  ticketID?: number;

  channel: 'Email' | 'Chat' | 'Phone' | 'WhatsApp'; // of string, maar zo enforce je de 4 opties
  
  channelID: number;

  incoming?: boolean;

  fromAddress?: string;

  fromName?: string;

  toAddress?: string;

  ccAddress?: string;

  bccAddress?: string;

  fromNumber?: string;

  toNumber?: string;

  subject?: string;

  textBody?: string;

  htmlBody?: string;

  message?: string;

  pageScreenshot?: string;

  pageURL?: string;

  senderType?: string;  // eventueel: 'EndUser' | 'CustomerRep'
  isOpened?: boolean;

  additionalInfo?: string;

  customFieldsData?: Record<string, unknown>;

  uid?: string;
}

export interface TicketMessageDetailDTO {
  messageID: number;
  ticketID: number;
  dateCreated: string;
  senderType: string;
  customerRepID?: number;
  customerRepName?: string;
  message?: string;
  subject?: string;
  headers?: string;
  fromAddress?: string;
  toAddress?: string;
  ccAddress?: string;
  bccAddress?: string;
  htmlBody?: string;
  textBody?: string;
  fromName?: string;
  isOpened?: boolean;
  isBounced?: boolean;
  messageDate?: string;
  messageIdentifier?: string;
  emailAddress?: string;
  incoming?: boolean;
  lastOpenDate?: string;
  twilio_CallSid?: string;
  fromNumber?: string;
  toNumber?: string;
  pageURL?: string;
  pageHTML?: string;
  pageScreenshot?: string;
  aISpamStatus?: string;
  aITopicsStatus?: string;
  aIReplyStatus?: string;
  aI_GeneratedResponse?: string;
  aI_ModifiedResponse?: string;
  aI_ResponseDateTime?: string;
  isLiked?: boolean;
  aI_FeedbackComment?: string;
  uid?: string;
  aiPrompt?: string;
  emailTemplateID?: string;
  status?: string;
  bodyPreview?: string;
  channelID?: number;
  channelName?: string;
  customerID: number;
  isEscalated?: boolean;       
  emailMsSqlID?: string;
  isKnownEndUser?:boolean;
  hasAttachment?:boolean;
  isSpamSpamAssassin?: boolean;
  isSpamAI?: boolean;
  additionalInfo?:string;
  replyToMessageID?:number;

  topics?: TicketMessageTopicDTO[];
  actions?: TicketMessageActionDTO[];
  customFieldsData?: { [key: string]: object };
  customFieldDefinitions?: CustomFieldDefinitionDTO[];
  lang?:string;
}

export interface TicketMessageTopicDTO {
  ticketMessageTopicID: number;
  messageID: number;
  topicID: number;
  topicName: string;
  corrected: boolean;
  correctionDate?: string;
  correctedByCustomerRepID?: number;
  correctedByCustomerRepName?: string;
}

export interface TicketMessageActionDTO {
  ticketMessageActionID: number;
  messageID: number;
  actionID: number;
  actionName: string;
  dateAssigned: string;
  status: string;
  priority: number;
}

export interface AddTopicRequest {
  messageID: number;
  topicID: number;
  customerRepID?: number;
}

export interface RemoveTopicRequest {
  ticketMessageTopicID: number;
  customerRepID: number;
}

export interface TicketMessageUpdateDTO {
  messageID: number;
  aI_ModifiedResponse?: string;
  customFieldsData?: { [key: string]: unknown };
  customFieldDefinitions?: CustomFieldDefinitionDTO[];
  lang?:string;
}

// Gebruik voor AI reply versturen
export interface SendMessageDTO {
  modifiedAnswer?: string;
}

// Gebruik voor de execute-action endpoint
export interface ExecuteActionRequest {
  actionID: number;
}

export interface ExecuteActionResponse {
  message: string;
  finished: boolean;
}

export interface TicketMessageAttachmentDTO {
  ticketMessageAttachmentID: number;
  messageID: number;
  fileName: string;
  contentType: string;
  createdDateTime: string;     // of Date, als je die meteen wilt omzetten
  isEndUserProvided: boolean;
  isCustomerRepProvided: boolean;
  accessToken: string;         // nodigt om “file/{accessToken}” te maken
}