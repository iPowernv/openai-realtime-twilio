// src/types/Document.ts

import { CustomFieldDefinitionDTO } from "./CustomFieldDefinitionDTO";
import { FieldMapping } from "./FieldMapping";

export interface Document {
    documentID: number;
    name: string;
    description?: string;
    isDataRetrievalProcess: boolean;
    creationDate: string;
    lastModifiedDate: string;
    content?:string;

  overrideApiBaseUrl?: string;
  overrideApiUsername?: string;
  overrideApiPassword?: string;
  overrideApiToken?: string;
  overrideApiAuthenticationType?: string;

  apiEndpoint?: string;
  apiMethod?: string;
  apiHeaders?: string;
  apiBodyTemplate?: string;

  fieldMappings?: FieldMapping[];

  fieldMapping?: string;

  customFieldDefinitions?: CustomFieldDefinitionDTO[];
  
  }
  