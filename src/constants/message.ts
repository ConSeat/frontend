const ERROR_MESSAGES: Record<string, string> = {
  DEFAULT: '예상치 못 한 오류가 발생하였습니다. 다시 접속해주세요.',
  OFFLINE: '오프라인 상태입니다. 네트워크를 확인해주세요.',

  // auth
  POST_LOGIN: '로그인에 실패했습니다. 다시 시도해주세요.',

  // stadium
  GET_STADIUMS: '공연장 정보를 가져오지 못했습니다. 다시 시도해주세요.',
};

const MESSAGES = {
  ERROR: ERROR_MESSAGES,
};

export default MESSAGES;
