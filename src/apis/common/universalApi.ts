import { apiService } from './apiService';
import { getAccessToken } from '@/utils/tokenCache';

const api = apiService(getAccessToken);
export default api;
