import api from './apiServer';
import { Customer, CustomerModelDTO } from '../types/Customer';

/**
 * Fetches the customer data.
 */
export const getCustomer = async (): Promise<Customer> => {
  const response = await api.get<Customer>('/customers/me');
  return response.data;
};

/**
 * Updates the customer data.
 */
export const updateCustomer = async (data: Partial<Customer>): Promise<void> => {
  await api.put('/customers/me', data);
};

export const getCustomerModels = async (): Promise<CustomerModelDTO[]> => {
  const response = await api.get<CustomerModelDTO[]>('/customers/models');
  return response.data;
};