const ERROR_MESSAGES: Record<string, string> = {
  DEFAULT: '예상치 못 한 오류가 발생하였습니다. 다시 접속해주세요.',
  OFFLINE: '오프라인 상태입니다. 네트워크를 확인해주세요.',

  // auth
  POST_LOGIN: '로그인에 실패했습니다. 다시 시도해주세요.',

  //member
  GET_MEMBER_INFO: '사용자 정보를 가져오는데 실패했습니다. 다시 시도해주세요',
  POST_MEMBER_INFO: '사용자 정보를 수정하는데 실패했습니다. 다시 시도해주세요',

  // review
  POST_REVIEWS_WITH_PARAMS: '리뷰 등록에 실패했습니다. 다시 시도해주세요.',
  POST_REVIEW_IMAGES: '리뷰 이미지 등록에 실패했습니다. 다시 시도해주세요.',
  GET_REVIEW_SEATINGS: '검색 구역 리뷰 조회에 실패했습니다. 다시 시도해주세요.',
  GET_MY_REVIEW: '내 후기 조회에 실패했습니다. 다시 시도해주세요.',
  GET_MY_REVIEW_DETAIL: '내 후기 상세정보 조회에 실패했습니다. 다시 시도해주세요.',
  GET_BOOKMARK_REVIEW: '관심 시야 조회에 실패했습니다. 다시 시도해주세요.',
  GET_BOOKMARK_DETAIL: '관심 시야 상세정보 조회에 실패했습니다. 다시 시도해주세요.',
  GET_REVIEW_IMAGES: '해당 리뷰 이미지 조회에 실패했습니다. 다시 시도해주세요.',
  POST_REVIEWS_BOOKMARK: '관심 시야 등록에 실패했습니다. 다시 시도해주세요.',
  POST_REVIEWS_LIKE: '좋아요 등록에 실패했습니다. 다시 시도해주세요.',
  DELETE_REVIEWS_BOOKMARK: '관심 시야 삭제에 실패했습니다. 다시 시도해주세요.',
  DELETE_REVIEWS_LIKE: '좋아요 삭제에 실패했습니다. 다시 시도해주세요.',

  // stadium
  GET_STADIUMS: '공연장 정보를 가져오지 못했습니다. 다시 시도해주세요.',
  GET_STADIUMS_BOOKMARK: '관심 시야 공연장 정보를 가져오지 못했습니다. 다시 시도해주세요.',
  GET_STADIUMS_MY_REVIEW: '내 후기 공연장 정보를 가져오지 못했습니다. 다시 시도해주세요.',
  GET_STADIUM_CONCERTS: '콘서트 정보를 가져오지 못했습니다. 다시 시도해주세요.',
  GET_STADIUM_SEATS: '공연장 좌석 정보를 가져오지 못했습니다. 다시 시도해주세요.',
  GET_STADIUM_FEATURES: '공연장  특징 정보를 가져오지 못했습니다. 다시 시도해주세요.',
  GET_STADIUM_OBSTRUCTIONS: '공연장 방해 요소 정보를 가져오지 못했습니다. 다시 시도해주세요.',
};

const MESSAGES = {
  ERROR: ERROR_MESSAGES,
};

export default MESSAGES;
