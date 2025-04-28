import { API_ENDPOINTS } from '../common/endpoints';
import api from '../common/universalApi';
import MESSAGES from '@/constants/message';
import { MemberInfoRequestBody } from '@/types/member';
import { MyReviewStadiumsResponse } from '@/types/stadium';

interface MemberInfoResponse {
  favoriteCount: number;
  myReviewCount: number;
  nickname: string;
  profileImage: string;
  email: string;
}

export const getMemberInfo = async () => {
  const { data } = await api.get<MemberInfoResponse>({
    endpoint: API_ENDPOINTS.MEMBERS,
    errorMessage: MESSAGES.ERROR.GET_MEMBER_INFO,
  });

  return data.body;
};

export const postMemberInfo = async (body: MemberInfoRequestBody) => {
  const formData = new FormData();
  formData.append('nickname', body.nickname);

  if (body.profileImage) {
    formData.append('file', body.profileImage.file);
  }

  return await api.post({
    endpoint: API_ENDPOINTS.MEMBERS,
    errorMessage: MESSAGES.ERROR.POST_MEMBER_INFO,
    body: formData,
  });
};

export const getBookmarkStadiums = async () => {
  const { data } = await api.get<MyReviewStadiumsResponse>({
    endpoint: API_ENDPOINTS.MEMBERS_BOOKMARK,
    errorMessage: MESSAGES.ERROR.GET_STADIUMS_BOOKMARK,
  });

  return data.body;
};

export interface MyBookmarkResponse {
  reviews: Reviews;
}

export interface Reviews {
  content: Content[];
  sliceNumber: number;
  size: number;
  hasNext: boolean;
  numberOfElements: number;
}

export interface Content {
  reviewId: number;
  thumbnailUrl: string;
  floorName: string;
  sectionName: string;
  seatingName: string;
  modifiedAt: string;
}

export const getBookmarkReview = async ({
  stadiumId,
  lastModifiedAt,
}: {
  stadiumId: number;
  lastModifiedAt: string;
}) => {
  const { data } = await api.get<MyBookmarkResponse>({
    endpoint: API_ENDPOINTS.MEMBERS_BOOKMARK_REVIEW(stadiumId, lastModifiedAt),
    errorMessage: MESSAGES.ERROR.GET_BOOKMARK_REVIEW,
  });

  return data.body;
};

export interface MyBookmarkDetailResponse {
  reviewId: number;
  writerNickname: string;
  writerSrc: string;
  concertName: string;
  images: string[];
  contents: string;
  createdAt: string;
  features: string[];
  obstructions: string[];
  isBookmarked: boolean;
}

export const getBookmarkDetail = async (reviewId: number) => {
  const { data } = await api.get<MyBookmarkDetailResponse>({
    endpoint: API_ENDPOINTS.MEMBERS_BOOKMARK_DETAIL(reviewId),
    errorMessage: MESSAGES.ERROR.GET_BOOKMARK_DETAIL,
  });

  return data.body;
};
