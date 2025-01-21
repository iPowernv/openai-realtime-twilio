// src/types/Action.ts

import { CustomFieldDefinitionDTO } from "./CustomFieldDefinitionDTO";
import { FieldMapping } from "./FieldMapping";

export interface Action {
    actionID: number;
    customerID: number;
    name: string;
    description?: string;
    apiEndpoint?: string;
    apiMethod?: string;
    apiHeaders?: string;
    apiBodyTemplate?: string;
    overrideApiBaseUrl?: string;
    overrideApiUsername?: string;
    overrideApiPassword?: string;
    overrideApiToken?: string;
    overrideApiAuthenticationType?: string;
    fieldMappings?: FieldMapping[];
    fieldMapping?: string;
    customFieldDefinitions?: CustomFieldDefinitionDTO[];
    responseFieldMappings?: FieldMapping[];
    responseFieldMapping?: string;
    actionType?:string;
    conditionalRules?:string;
    
    forwardRecipients?:string;
  }
  