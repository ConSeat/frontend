import { apiService } from './apiService';
import Cookies from 'js-cookie';

const getClientAccessToken = async (): Promise<string> => {
  return Cookies.get('access_token') || '';
};

const clientApi = apiService(getClientAccessToken);
export default clientApi;
