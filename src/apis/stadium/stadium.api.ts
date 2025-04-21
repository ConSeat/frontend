import { API_ENDPOINTS } from '../common/endpoints';
import api from '../common/universalApi';
import MESSAGES from '@/constants/message';

export interface StadiumInfo {
  stadiumId: number;
  stadiumName: string;
  stadiumImage: string;
}

export interface StadiumListResponse {
  totalReviewCount: number;
  active: StadiumInfo[];
  inactive: StadiumInfo[];
}

export const getStadiumList = async () => {
  const { data } = await api.get<StadiumListResponse>({
    endpoint: API_ENDPOINTS.STADIUMS,
    errorMessage: MESSAGES.ERROR.GET_STADIUMS,
  });

  return { data: data.body };
};
