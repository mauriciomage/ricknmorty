import {
  ActionReducerMap, createReducer, on, State,
} from '@ngrx/store';
import { Character } from '../../shared/interfaces/main.interface';
import { DetailsActions } from '../action-type';
import { Status } from '../../app.constant';

export const detailsFeatureKey = 'details';

export interface DetailState {
  details: Character
}

export const initialLocation = {url: '', name: ''};
export const initialDetailsState: DetailState = {
  details: {
    id: 0,
    name: '',
    status: Status.UNKNOWN,
    created: '',
    episode: [],
    gender: '',
    image: '',
    location: initialLocation,
    origin: initialLocation,
    species: '',
    type: '',
    url: ''
  }
}

export const detailsReducer = createReducer(
  initialDetailsState,

  on(DetailsActions.storeDetails, (state, action): DetailState => {
    return {
      details: action.details
    };
  }),
);