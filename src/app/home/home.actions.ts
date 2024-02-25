import { createAction, props } from '@ngrx/store';
import { Character } from '../shared/interfaces/main.interface';

export const listCharacters = createAction(
  "[Home Page] List Characters",
  props<{results: Character[]}>())

export const unsetCharacters = createAction(
  "[Home Page] Unset Characters"
)
