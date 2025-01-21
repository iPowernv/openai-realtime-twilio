// src/types/EndUser.ts

export interface EndUserUIDReadDTO {
  endUserUIDID: number;
  uid: string;
  uidType: string;
  isPrimary: boolean;
}

export interface EndUserReadDTO {
  endUserID: number;
  firstname?: string;
  lastname?: string;
  gender?: boolean; // null / true / false
  otherContactDetails?: string;
  customerRef?: string;
  country?: string;
  lang?: string;
  company?:string;

  // Toegevoegd: adresvelden
  street?: string;
  houseNumber?: string;
  postalCode?: string;
  city?: string;
  aIDocumentation?: string;

  // Array van uiDs (emails, telefoons, etc.)
  uiDs: EndUserUIDReadDTO[];
}

/**
 * Voor POST (Nieuwe EndUser)
 */
export interface EndUserCreateDTO {
  firstname?: string;
  lastname?: string;
  gender?: boolean;
  otherContactDetails?: string;
  customerRef?: string;
  country?: string;
  lang?: string;
  company?:string;

  // Toegevoegd: adresvelden
  street?: string;
  houseNumber?: string;
  postalCode?: string;
  city?: string;

  uiDs: EndUserUIDCreateDTO[];
}

export interface EndUserUIDCreateDTO {
  uidType: string;
  uid: string;
  isPrimary: boolean;
  markAsDeleted?: boolean;
  endUserUIDID?: number
}

/**
 * Voor PUT (Updaten EndUser)
 */
export interface EndUserUpdateDTO {
  firstname?: string;
  lastname?: string;
  gender?: boolean;
  otherContactDetails?: string;
  customerRef?: string;
  country?: string;
  lang?: string;
  company?:string;

  // Toegevoegd: adresvelden
  street?: string;
  houseNumber?: string;
  postalCode?: string;
  city?: string;

  uiDs: EndUserUIDUpdateDTO[];
}

export interface EndUserUIDUpdateDTO {
  endUserUIDID?: number; // null => nieuw
  uidType: string;
  uid: string;
  isPrimary: boolean;
  markAsDeleted?: boolean;
}

export interface AssignUIDRequest {
  uid: string;
  endUserID: number;
  uidType?: string;
  isPrimary: boolean;
}