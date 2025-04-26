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
    formData.append('profileImage', body.profileImage.file);
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
    errorMessage: MESSAGES.ERROR.GET_MEMBER_INFO,
  });

  return data.body;
};
