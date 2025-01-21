export interface FieldMapping {
    apiParameterName: string;
    fieldName: string;
    // Voeg hier 'CustomFields' toe
    fieldType: 'Ticket' | 'TicketMessage' | 'CustomFields';
}

export interface AvailableField {
    name: string;
    // Voeg hier ook 'CustomFields' toe
    type: 'Ticket' | 'TicketMessage' | 'CustomFields';
}