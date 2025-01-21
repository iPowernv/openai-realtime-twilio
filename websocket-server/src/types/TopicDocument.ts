// src/types/TopicDocument.ts

export interface TopicDocumentCreateDTO {
  topicID?: number;        // topic kan weggelaten worden
  specialTopic?: string;   // bv. "All"

  documentID: number;
  channelID?: number;
  specialChannel?: 'Email' | 'Chat' | 'Phone' | 'WhatsApp' | 'All';
}

export interface TopicDocumentReadDTO {
    topicDocumentID: number;
    customerID: number;
    topicID: number;
    topicName: string;
    documentID: number;
    documentName: string;
    channelID?: number;
    channelName?: string;
    channelType?: 'Email' | 'Chat' | 'Phone' | 'WhatsApp';
    specialChannel?: 'Email' | 'Chat' | 'Phone' | 'WhatsApp' | 'All';
    specialTopic?: string;   // bv. "All"
  }
  
  export interface TopicDocumentUpdateDTO {
    topicID: number;
    documentID: number;
    channelID?: number;
    specialChannel?: 'Email' | 'Chat' | 'Phone' | 'WhatsApp' | 'All';
    specialTopic?: string;   // bv. "All"
  }

