import { createSelector, createFeatureSelector } from '@ngrx/store';
import { DetailState, initialDetailsState } from './reducers';
export const selectDetailState = createFeatureSelector<DetailState>("details");

export const hasDetails = createSelector(selectDetailState, (state: DetailState) => state.details);


export const makeSelectDetailById = (id: number) => createSelector(
  selectDetailState,
  (details) => {
   return details.details && details.details.id === +id ? details.details : initialDetailsState.details
  } 
);