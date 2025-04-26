import type { ImageData } from '@/types/review';

export interface MemberInfoRequestBody {
  nickname: string;
  profileImage: ImageData | null;
}
