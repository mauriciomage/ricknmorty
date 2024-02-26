import { createSelector, createFeatureSelector } from '@ngrx/store';
import { DetailState } from './reducers';
export const selectDetailState = createFeatureSelector<DetailState>("details");

export const hasData = createSelector(selectDetailState, (state: DetailState) => state.details);