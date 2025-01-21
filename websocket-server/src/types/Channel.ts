// src/types/Channel.ts
export interface Channel {
  channelID: number;
  channelType: 'Email' | 'Chat' | 'Phone' | 'WhatsApp';
  name: string;
  connectionDetails?: string;
  isActive: boolean;

  // New fields for email channels:
  emailAddress?: string;
  overrideEmailSettings?: boolean;
  overrideGraphTenantID?: string | null | undefined;
  overrideGraphClientID?: string | null | undefined;
  overrideGraphClientSecret?: string | null | undefined;
  overrideGraphAuthorityURL?: string | null | undefined;
  overrideGraphScope?: string | null | undefined;

  token?: string;        // GUID (readonly)
  hostnames?: string;    // Bij chat, gescheiden door komma/spatie
  isDefaultTranslationChannel: boolean;
  phoneNumber?: string;
  
}