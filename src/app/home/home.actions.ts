import { createAction, props } from '@ngrx/store';
import { Main } from '../shared/interfaces/main.interface';

export const storeInfo = createAction(
  "[Home Page] Store Info",
  props<{data: Main}>())

export const unsetInfo = createAction(
  "[Home Page] Unset Info"
)
