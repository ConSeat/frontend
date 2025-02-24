import { createApiService } from './commonApi';
import Cookies from 'js-cookie';

const getClientAccessToken = (): string => {
  return Cookies.get('access_token') || '';
};

const clientApi = createApiService(getClientAccessToken);
export default clientApi;
