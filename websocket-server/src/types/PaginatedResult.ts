// src/types/PaginatedResult.ts

export interface PaginatedResult<T> {
    items: T[];
    totalCount: number;
    totalPages: number;
  }
  
  export interface PaginationParameters {
    pageNumber: number;
    pageSize: number;
    sortBy?: string;
    sortOrder?: string;
  }
  
  export interface PaginatedResult<T> {
    items: T[];
    totalCount: number;
    totalPages: number;
  }