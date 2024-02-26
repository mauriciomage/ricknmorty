import { createAction, props } from '@ngrx/store';
import { Character } from '../shared/interfaces/main.interface';

export const storeDetails = createAction(
  "[Details Page] Store Details",
  props<{details: Character}>())