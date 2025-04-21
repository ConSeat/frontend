import { apiService } from './apiService';
import { getAccessToken } from '@/utils/getAccessToken';

const api = apiService(getAccessToken);
export default api;
