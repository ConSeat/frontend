import { apiService } from './apiService';
import { getAccessToken } from '@/utils/authUtils';

const api = apiService(getAccessToken);
export default api;
