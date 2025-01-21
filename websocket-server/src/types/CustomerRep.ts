// src/types/CustomerRep.ts

export interface CustomerRepReadDTO {
    customerRepID: number;
    username: string;
    name: string;
    email: string;
    phoneNumber?: string;
    otherDetails?: string;
    emailSignatureHTML?: string;
    emailSignatureText?: string;
  }
  
  export interface CustomerRepCreateDTO {
    username: string;
    password: string;
    name: string;
    email: string;
    phoneNumber?: string;
    otherDetails?: string;
    emailSignatureHTML?: string;
    emailSignatureText?: string;
  }
  
  export interface CustomerRepUpdateDTO {
    customerRepID: number;
    name: string;
    email: string;
    phoneNumber?: string;
    otherDetails?: string;
    emailSignatureHTML?: string;
    emailSignatureText?: string;
  }

  export interface CustomerRepSignature {
    customerRepSignatureID: number;
    customerRepID: number;
    lang: string; 
    emailSignatureHTML?: string;
    emailSignatureText?: string;
  }
  