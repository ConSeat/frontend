export const memberKeys = {
  all: ['members'] as const,
  me: () => [...memberKeys.all, 'me'] as const,
  bookmarks: () => [...memberKeys.all, 'bookmarks'] as const,
  bookmarksStadiums: () => [...memberKeys.bookmarks(), 'stadiums'] as const,
  bookmarkDetail: (reviewId: number) => [...memberKeys.bookmarks(), 'review', reviewId] as const,
};

export const reviewKeys = {
  all: ['reviews'] as const,
  mine: () => [...reviewKeys.all, 'mine'] as const,
  stadiums: () => [...reviewKeys.all, 'stadiums'] as const,
  detail: (reviewId: number) => [...reviewKeys.all, reviewId] as const,
  concertSeating: (concertId: number, seatingId: number) =>
    [...reviewKeys.all, 'concert', concertId, 'seating', seatingId] as const,
};

export const stadiumKeys = {
  all: ['stadiums'] as const,
  concerts: (stadiumId: number, query?: string) =>
    [...stadiumKeys.all, stadiumId, 'concerts', query ?? ''] as const,
  seats: (stadiumId: number) => [...stadiumKeys.all, stadiumId] as const,
  features: () => [...stadiumKeys.all, 'features'] as const,
  obstructions: () => [...stadiumKeys.all, 'obstructions'] as const,
};
