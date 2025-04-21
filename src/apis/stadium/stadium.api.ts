import { API_ENDPOINTS } from '../common/endpoints';
import api from '../common/universalApi';
import MESSAGES from '@/constants/message';

// 콘서트장 목록 조회
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

// 콘서트 목록 조회
export interface StadiumConcertInfo {
  concertId: number;
  concertName: string;
}

export interface StadiumConcertsResponse {
  concerts: StadiumConcertInfo[];
}

export const getStadiumConcerts = async (stadiumId: number, query?: string) => {
  const { data } = await api.get<StadiumConcertsResponse>({
    endpoint: API_ENDPOINTS.STADIUM_CONCERTS(stadiumId, query),
    errorMessage: MESSAGES.ERROR.GET_STADIUM_CONCERTS,
  });
  return { data: data.body };
};

// 콘서트장 좌석 조회
export interface Seat {
  seatingId: number;
  name: string;
}

export interface Section {
  name: string;
  seats: Seat[];
}

export interface Floor {
  name: string;
  sections: Section[];
}

export interface StadiumSeatingResponse {
  header: {
    message: string;
  };
  body: {
    floors: Floor[];
  };
}

export const getStadiumSeats = async (stadiumId: number) => {
  const { data } = await api.get<StadiumSeatingResponse>({
    endpoint: API_ENDPOINTS.STADIUM_SEATS(stadiumId),
    errorMessage: MESSAGES.ERROR.GET_STADIUM_SEATS,
  });
  return { data: data.body };
};

// 콘서트장 특징 조회
export interface StadiumFeatureInfo {
  featureId: number;
  name: string;
}

export interface StadiumFeaturesResponse {
  features: StadiumFeatureInfo[];
}

export const getStadiumFeatures = async () => {
  const { data } = await api.get<StadiumFeaturesResponse>({
    endpoint: API_ENDPOINTS.STADIUM_FEATURES,
    errorMessage: MESSAGES.ERROR.GET_STADIUM_FEATURES,
  });
  return { data: data.body };
};

// 콘서트장 방해요소 조회
export interface StadiumObstructionInfo {
  obstructionId: number;
  name: string;
}

export interface StadiumObstructionsResponse {
  obstructions: StadiumObstructionInfo[];
}

export const getStadiumObstructions = async () => {
  const { data } = await api.get<StadiumObstructionsResponse>({
    endpoint: API_ENDPOINTS.STADIUM_OBSTRUCTIONS,
    errorMessage: MESSAGES.ERROR.GET_STADIUM_OBSTRUCTIONS,
  });
  return { data: data.body };
};
