import { API_ENDPOINTS } from '../common/endpoints';
import api from '../common/universalApi';
import MESSAGES from '@/constants/message';
import type {
  Floor,
  SeatWithReviewCount,
  StadiumConcertInfo,
  StadiumFeatureInfo,
  StadiumInfo,
  StadiumObstructionInfo,
} from '@/types/stadium';

// 콘서트장 목록 조회
export interface StadiumListResponse {
  totalReviewCount: number;
  active: StadiumInfo[];
  inactive: StadiumInfo[];
}

export const getStadiumList = async () => {
  const { data } = await api.public.get<StadiumListResponse>({
    endpoint: API_ENDPOINTS.STADIUMS,
    errorMessage: MESSAGES.ERROR.GET_STADIUMS,
  });
  return { data: data.body };
};

// 콘서트 목록 조회
export interface StadiumConcertsResponse {
  concerts: StadiumConcertInfo[];
}

export const getStadiumConcerts = async (stadiumId: number, query?: string) => {
  const { data } = await api.public.get<StadiumConcertsResponse>({
    endpoint: API_ENDPOINTS.STADIUM_CONCERTS(stadiumId, query),
    errorMessage: MESSAGES.ERROR.GET_STADIUM_CONCERTS,
  });
  return { data: data.body };
};

// 콘서트장 정보 조회(좌석)
export interface StadiumSeatingResponse {
  floors: Floor[];
}

export const getStadiumSeats = async (stadiumId: number) => {
  const { data } = await api.public.get<StadiumSeatingResponse>({
    endpoint: API_ENDPOINTS.STADIUM_SEATS(stadiumId),
    errorMessage: MESSAGES.ERROR.GET_STADIUM_SEATS,
    init: { cache: 'force-cache' },
  });
  return { data: data.body };
};

// 콘서트장 특징 조회
export interface StadiumFeaturesResponse {
  features: StadiumFeatureInfo[];
}

export const getStadiumFeatures = async () => {
  const { data } = await api.public.get<StadiumFeaturesResponse>({
    endpoint: API_ENDPOINTS.STADIUM_FEATURES,
    errorMessage: MESSAGES.ERROR.GET_STADIUM_FEATURES,
    init: { cache: 'force-cache' },
  });
  return { data: data.body };
};

// 콘서트장 방해요소 조회
export interface StadiumObstructionsResponse {
  obstructions: StadiumObstructionInfo[];
}

export const getStadiumObstructions = async () => {
  const { data } = await api.public.get<StadiumObstructionsResponse>({
    endpoint: API_ENDPOINTS.STADIUM_OBSTRUCTIONS,
    errorMessage: MESSAGES.ERROR.GET_STADIUM_OBSTRUCTIONS,
    init: { cache: 'force-cache' },
  });
  return { data: data.body };
};

// 구역 리스트 조회
export interface StadiumSectionsResponse {
  floors: Floor[];
}

export const getStadiumSections = async (stadiumId: number) => {
  const { data } = await api.public.get<StadiumSectionsResponse>({
    endpoint: `/stadiums/${stadiumId}/sections`,
    errorMessage: MESSAGES.ERROR.GET_STADIUM_SECTIONS,
    init: { cache: 'force-cache' },
  });
  return { data: data.body };
};

// 좌석(열) 리스트 조회
export interface SectionSeatingsResponse {
  seating: SeatWithReviewCount[];
  sectionInfo: string;
}

export const getSectionSeatings = async (sectionId: number) => {
  const { data } = await api.public.get<SectionSeatingsResponse>({
    endpoint: `/stadiums/sections/${sectionId}/seating`,
    errorMessage: MESSAGES.ERROR.GET_SECTION_SEATINGS,
    init: { cache: 'force-cache' },
  });
  return { data: data.body };
};
