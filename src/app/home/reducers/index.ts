import {
  ActionReducerMap, createReducer, on, State,
} from '@ngrx/store';
import { Character, Main } from '../../shared/interfaces/main.interface';
import { HomeActions } from '../action-type';

export const homeFeatureKey = 'home';

export interface HomeState {
  data: Main
}
export const initialValue = {info:{count: 0, pages: 0, prev: '', next: ''}, results: []};
export const initialHomeState: HomeState = {
  data: initialValue
}

export const homeReducer = createReducer(
  initialHomeState,

  on(HomeActions.storeInfo, (state, action): HomeState => {
    return {
      data: action.data
    };
  }),
);