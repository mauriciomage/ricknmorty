import {
  ActionReducerMap, createReducer, on,
} from '@ngrx/store';
import { Character } from '../../shared/interfaces/main.interface';
import { HomeActions } from '../action-type';

export const homeFeatureKey = 'home';

export interface HomeState {
  results: Character[]
}


export const initialHomeState: HomeState = {
  results: []
}

export const homeReducer = createReducer(
  initialHomeState,

  on(HomeActions.listCharacters, (state, action) => {
    return {
      results: action.results
    };
  })
);