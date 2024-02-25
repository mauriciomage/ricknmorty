import { createSelector, createFeatureSelector } from '@ngrx/store';
import { HomeState } from './reducers';
export const selectHomeState = createFeatureSelector<HomeState>("home");

export const hasData = createSelector(selectHomeState, (state: HomeState) => state.data);