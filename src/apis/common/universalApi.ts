import { apiService } from './apiService';
import { getAccessToken } from '@/utils/accessTokenStorage';

const api = apiService(getAccessToken);
export default api;
