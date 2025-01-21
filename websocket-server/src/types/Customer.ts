// src/types/Customer.ts
export interface Customer {
  customerID: number;
  apiBaseUrl?: string;
  apiUsername?: string;
  apiPassword?: string;
  apiToken?: string;
  apiAuthenticationType?: string;

  emailProviderType?: string; // e.g. "Office365"
  graphTenantID?: string;
  graphClientID?: string;
  graphClientSecret?: string;
  graphAuthorityURL?: string;
  graphScope?: string;

    // Voeg de default model ID velden hier toe
    defaultTopicModelId?: number | null;
    defaultWebchatModelId?: number | null;
    defaultEmailTextModelId?: number | null;
    defaultEmailVisionModelId?: number | null;
    defaultCallModelId?: number | null;
    defaultSpamModelId?: number | null;

    models?: CustomerModelDTO[];
    defaultCustomerRepID?: number | null;
    
}

export interface CustomerModelDTO {
  modelID: number;
  modelType: string;
  modelName: string;
  isFineTuned: boolean;
  hasVision: boolean;
  requiredSubscriptionLevel?: string;
  isGlobal: boolean;
  isDefault: boolean;
}
