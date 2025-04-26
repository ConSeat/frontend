export type StadiumType = 'active' | 'inactive';

export interface StadiumInfo {
  stadiumId: number;
  stadiumName: string;
  stadiumImage: string;
}

export interface StadiumConcertInfo {
  concertId: number;
  concertName: string;
}

export interface Seat {
  seatingId: number;
  name: string;
}

export interface SeatWithReviewCount extends Seat {
  reviewCount: number;
}

export interface Section {
  sectionId: number;
  name: string;
  seats?: Seat[];
}

export interface Floor {
  name: string;
  sections: Section[];
}

export interface StadiumFeatureInfo {
  featureId: number;
  name: string;
}

export interface StadiumObstructionInfo {
  obstructionId: number;
  name: string;
}
