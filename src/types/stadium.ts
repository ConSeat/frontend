export interface StadiumInfo {
  stadiumId: number;
  stadiumName: string;
  stadiumImage: string;
}

export interface StadiumListResponse {
  totalReviewCount: number;
  active: StadiumInfo[];
  inactive: StadiumInfo[];
}
