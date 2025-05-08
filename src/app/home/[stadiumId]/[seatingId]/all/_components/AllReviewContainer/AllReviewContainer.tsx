'use client';

import type { FilterAction, FilterState } from '../../_types/filter';
import AllReviewContent from '../AllReviewContent/AllReviewContent';
import React, { useReducer } from 'react';
import ApiErrorBoundary from '@/components/ApiErrorBoundary';
import { reviewKeys } from '@/apis/common/queryKeys';
import type { ListSort } from '@/types/review';

const createInitFilterData = (stadiumId: number, seatingId: number) => {
  const initData = {
    stadiumId,
    seatingId,
    features: [],
    obstructions: [],
    sort: '' as ListSort,
  };

  return initData;
};

export interface AllReviewContainerProps {
  stadiumId: number;
  seatingId: number;
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
        features: action.payload.features,
      });

    case 'OBSTRUCTIONS':
      return updateState(state, {
        obstructions: action.payload.obstructions,
      });

    case 'SORT':
      return updateState(state, { sort: action.payload.sort });

    default:
      return state;
  }
};

const AllReviewContainer = ({ stadiumId, seatingId }: AllReviewContainerProps) => {
  const [state, dispatch] = useReducer(filterReducer, createInitFilterData(stadiumId, seatingId));

  return (
    <ApiErrorBoundary queryKey={reviewKeys.all}>
      <AllReviewContent
        filterData={state}
        dispatch={dispatch}
        stadiumId={stadiumId}
        seatingId={seatingId}
      />
    </ApiErrorBoundary>
  );
};

export default AllReviewContainer;
