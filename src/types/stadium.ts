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

export interface Section {
  name: string;
  seats: Seat[];
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
