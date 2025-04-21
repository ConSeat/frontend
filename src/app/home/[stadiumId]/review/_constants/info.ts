export const FLOOR = 'FLOOR';
export const NONE_SELECT = -1;
export const MAX_IMAGE_UPLOAD_NUMBER = 4;

export const DISTANCE_VALUE = {
  CLOSE: 'CLOSE',
  AVERAGE: 'AVERAGE',
  FAR: 'FAR',
};

export const STAGE_DISTANCE_INFO = [
  { value: DISTANCE_VALUE.CLOSE, name: '가까워요' },
  { value: DISTANCE_VALUE.AVERAGE, name: '보통이에요' },
  { value: DISTANCE_VALUE.FAR, name: '안 보여요' },
] as const;

export const THRUST_STAGE_DISTANCE_INFO = [
  { value: DISTANCE_VALUE.CLOSE, name: '가까워요' },
  { value: DISTANCE_VALUE.AVERAGE, name: '보통이에요' },
  { value: DISTANCE_VALUE.FAR, name: '안 보여요' },
] as const;

export const SCREEN_DISTANCE_INFO = [
  { value: DISTANCE_VALUE.CLOSE, name: '잘 보여요' },
  { value: DISTANCE_VALUE.AVERAGE, name: '보통이에요' },
  { value: DISTANCE_VALUE.FAR, name: '안 보여요' },
] as const;
