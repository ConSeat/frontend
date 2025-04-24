'use client';

import AllReviewContent from '../AllReviewContent/AllReviewContent';
import React, { useReducer } from 'react';
import { toggleItem } from '@/utils/toggleItem';

export interface FilterState {
  stadiumId: number;
  seatingId: number;
  features: number[];
  obstructions: number[];
  lastReviewId: number;
  sort: string;
}

export type FilterAction =
  | { type: 'SEATING'; payload: { seatingId: number } }
  | { type: 'FEATURES'; payload: { feature: number } }
  | { type: 'OBSTRUCTIONS'; payload: { obstruction: number } }
  | { type: 'LAST_REVIEW_ID'; payload: { lastReviewId: number } }
  | { type: 'SORT'; payload: { sort: string } };

const createInitFilterData = (stadiumId: number, seatingId: number) => {
  const initData = {
    stadiumId,
    seatingId,
    features: [],
    obstructions: [],
    lastReviewId: 0,
    sort: '',
  };

  return initData;
};

export interface AllReviewContainerProps {
  stadiumId: number;
  seatingId: number;
}

export interface ReviewSummary {
  floorName: string;
  sectionName: string;
  seatingName: string;
}

const updateState = (state: FilterState, updates: Partial<FilterState>): FilterState => ({
  ...state,
  ...updates,
});

const filterReducer = (state: FilterState, action: FilterAction): FilterState => {
  switch (action.type) {
    case 'SEATING':
      return updateState(state, {
        seatingId: action.payload.seatingId,
      });

    case 'FEATURES':
      return updateState(state, {
        features: toggleItem(state.features, action.payload.feature),
      });

    case 'OBSTRUCTIONS':
      return updateState(state, {
        obstructions: toggleItem(state.obstructions, action.payload.obstruction),
      });

    case 'LAST_REVIEW_ID':
      return updateState(state, { lastReviewId: action.payload.lastReviewId });

    case 'SORT':
      return updateState(state, { sort: action.payload.sort });

    default:
      return state;
  }
};

const AllReviewContainer = ({ stadiumId, seatingId }: AllReviewContainerProps) => {
  const [state, dispatch] = useReducer(filterReducer, createInitFilterData(stadiumId, seatingId));

  return (
    <AllReviewContent
      filterData={state}
      dispatch={dispatch}
      stadiumId={stadiumId}
      seatingId={seatingId}
    />
  );
};

export default AllReviewContainer;
