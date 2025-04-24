import { API_ENDPOINTS } from '../common/endpoints';
import api from '../common/universalApi';
import MESSAGES from '@/constants/message';
import { SeatingReview } from '@/types/review';

interface SeatingReviews {
  reviews: SeatingReview[];
  floorName: string;
  sectionName: string;
  seatingName: string | null;
  distanceMessage: string;
  thumbnails: string[];
  reviewCount: number;
}

export const getSeatingReviews = async (seatingId: number) => {
  const { data } = await api.get<SeatingReviews>({
    endpoint: API_ENDPOINTS.REVIEWS_SEATING(seatingId),
    errorMessage: MESSAGES.ERROR.GET_REVIEW_SEATINGS,
  });

  return data.body;
};
