export const OBSTRUCTIONS_NONE = 5;
export const FLOOR = 'FLOOR';
export const NONE_SELECT = -1;
export const MAX_IMAGE_UPLOAD_NUMBER = 4;

const DISTANCE_VALUE = {
  CLOSE_DIST: '가까워요',
  CLOSE_VIEW: '잘 보여요',
  NORMAL: '보통이에요',
  FAR: '안 보여요',
};

export const STAGE_DISTANCE_INFO = [
  DISTANCE_VALUE.CLOSE_DIST,
  DISTANCE_VALUE.NORMAL,
  DISTANCE_VALUE.FAR,
] as const;

export const THRUST_STAGE_DISTANCE_INFO = [
  DISTANCE_VALUE.CLOSE_DIST,
  DISTANCE_VALUE.NORMAL,
  DISTANCE_VALUE.FAR,
] as const;

export const SCREEN_DISTANCE_INFO = [
  DISTANCE_VALUE.CLOSE_VIEW,
  DISTANCE_VALUE.NORMAL,
  DISTANCE_VALUE.FAR,
] as const;

export const OBSTRUCTIONS_INFO = [
  { obstructionId: 1, name: '카메라에 가려요' },
  { obstructionId: 2, name: '펜스 방해가 있어요' },
  { obstructionId: 3, name: '단차가 있어요' },
  { obstructionId: 4, name: '스키퍼에 가려요' },
  { obstructionId: OBSTRUCTIONS_NONE, name: '없음' },
] as const;
