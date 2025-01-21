import api from './apiServer';
import { CustomFieldDefinitionDTO } from '../types/CustomFieldDefinitionDTO';

export async function getCustomerCustomFields(): Promise<CustomFieldDefinitionDTO[]> {
  try {
    const response = await api.get('/CustomerCustomFields');
    console.log('Response received:', response.data);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch customer custom fields:', error);
    throw error;
  }
}
