import type { ListSort } from '@/types/review';

export interface FilterState {
  stadiumId: number;
  seatingId: number;
  features: number[];
  obstructions: number[];
  sort: ListSort;
}

export type FilterAction =
  | { type: 'SEATING'; payload: { seatingId: number } }
  | { type: 'FEATURES'; payload: { features: number[] } }
  | { type: 'OBSTRUCTIONS'; payload: { obstructions: number[] } }
  | { type: 'SORT'; payload: { sort: ListSort } };
