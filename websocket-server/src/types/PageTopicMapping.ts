// src/types/PageTopicMapping.ts

export interface PageTopicMappingCreateDTO {
  topicID?: number;           // nu optioneel
  specialTopic?: string;      // bv. "All" of later meer varianten
  urlPattern: string;
  matchType: 'Exact' | 'StartsWith' | 'Contains' | 'EndsWith';
  pathScope: 'Domain' | 'Hostname' | 'RelativePath' | 'FullPath';

  channelID?: number;
  specialChannel?: string;    
}



export interface PageTopicMappingReadDTO {
  pageTopicMappingID: number;
  customerID: number;
  topicID?: number;
  topicName: string;

  urlPattern: string;
  matchType: 'Exact' | 'StartsWith' | 'Contains' | 'EndsWith';
  pathScope: 'Domain' | 'Hostname' | 'RelativePath' | 'FullPath';

  channelID?: number;
  channelName?: string;       // evt. van de server
  specialChannel?: string;    

  createdByCustomerRepID: number;
  creationDate: string;
  lastModifiedByCustomerRepID?: number;
  lastModifiedDate?: string;
  specialTopic?: string;
}

export interface PageTopicMappingUpdateDTO {
  topicID?: number;
  urlPattern: string;
  matchType: 'Exact' | 'StartsWith' | 'Contains' | 'EndsWith';
  pathScope: 'Domain' | 'Hostname' | 'RelativePath' | 'FullPath';
  channelID?: number;
  specialChannel?: string;    
  specialTopic?: string;
}
