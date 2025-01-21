// src/types/TopicAction.ts

export interface TopicActionCreateDTO {
  topicID?: number; // nu nullable
  specialTopic?: string; // string, of literal union als je “All” wilt

  actionID: number;
  channelID?: number;
  specialChannel?: 'Email' | 'Chat' | 'Phone' | 'WhatsApp' | 'All';
  priority: number;
}

  
  export interface TopicActionReadDTO {
    topicActionID: number;
    customerID: number;
    topicID: number;
    topicName: string;
    actionID: number;
    actionName: string;
    channelID?: number;
    channelName?: string;
    specialChannel?: 'Email' | 'Chat' | 'Phone' | 'WhatsApp' | 'All';
    priority: number;
    specialTopic?: string;   // bv. "All"
  }
  
  export interface TopicActionUpdateDTO {
    topicID: number;
    actionID: number;
    channelID?: number;
    specialChannel?: 'Email' | 'Chat' | 'Phone' | 'WhatsApp' | 'All';
    priority: number;
    specialTopic?: string;   // bv. "All"
  }
  
  export interface TopicActionUpdateDTO {
    priority: number;
  }
  