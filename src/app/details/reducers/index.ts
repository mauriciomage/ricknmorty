import {
  ActionReducerMap, createReducer, on, State,
} from '@ngrx/store';
import { Character } from '../../shared/interfaces/main.interface';
import { DetailsActions } from '../action-type';

export const detailsFeatureKey = 'details';

export interface DetailState {
  details: Character | null
}
export const initialDetailsState: DetailState = {
  details: null
}

export const detailsReducer = createReducer(
  initialDetailsState,

  on(DetailsActions.storeDetails, (state, action): DetailState => {
    return {
      details: action.details
    };
  }),
);