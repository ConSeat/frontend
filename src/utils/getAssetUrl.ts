import { PUBLIC_ENV } from '@/config/env';

export const getStadiumAssetUrl = (stadiumId: number) =>
  `${PUBLIC_ENV.assetsUrl}/stadium/${stadiumId}.svg`;
