// src/types/PromptDocument.ts

import { EndUserReadDTO } from "./EndUser";
import { TicketReadDTO } from "./Ticket";

export interface PromptDocument {
    documentID: number;
    content: string;
    name: string;
    imageUrls: string[]; 
  }
  
  export interface PromptDocsExtendedDTO {
    promptDocuments: PromptDocument[];
    endUsers: EndUserReadDTO[];
    tickets: TicketReadDTO[];
  }