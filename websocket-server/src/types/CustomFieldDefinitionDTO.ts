export interface CustomFieldDefinitionDTO {
    fieldName: string;
    displayName: string;
    fieldType: string; // e.g., 'text', 'number', 'date', 'dropdown'
    isRequired: boolean;
    order: number;
    options?: string[]; // For dropdowns
  }
  
  