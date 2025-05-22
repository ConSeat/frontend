import { apiService } from './apiService';
import { getAccessToken } from '@/utils/authUtils';

export const api = {
  secure: apiService(getAccessToken),
  public: apiService(async () => ''),
};

export default api;
