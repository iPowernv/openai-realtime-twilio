// src/types/Ticket.ts

import { EndUserReadDTO } from "./EndUser";

// src/types/Ticket.ts

export interface TicketReadDTO {
  ticketID: number;
  customerRepID?: number;
  customerRepName?: string;
  status: string;
  subject: string;
  escalated: boolean;
  isSpam: boolean;
  isClosed: boolean;
  dateCreated: string;
  lastMessageDate?:string;
  closeDate?: string;
  channel: string;
  channelName?: string;
  uid?: string;
  channelID?: number;
  preview?: string;
  endUsers?: EndUserReadDTO[];
  topics?: string[];
  aiFeedbackComments?: string[]; // Alle escalated comments, nieuwste eerst
  summary?: string;
  
}

export interface TicketQueryParameters {
  status?: string[];
  customerRepID?: number;
  channel?: string;
  uid?: string;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  pageNumber?: number;
  pageSize?: number;
  isSpam?: boolean;
  isClosed?: boolean;
  channelIDs?: number[];
  endUserId?: number;
}

export interface BulkUpdateRequest {
  ticketIDs: number[];
  action: string;
  customerRepID: number;
}

export interface EndUserUIDReadDTO {
  endUserUIDID: number;
  uid: string;
  uidType: string;
  isPrimary: boolean;
}


export interface TicketWriteDTO {
  customerRepID?: number;
  status: string;
  subject: string;
  escalated: boolean;
  isSpam: boolean;
  isClosed: boolean;
  closeDate?: string;
  channel: string;
  uid?: string;
  channelID?: number;
  preview?: string;
  summary?: string;
  twilio_CallSid?: string;
}

