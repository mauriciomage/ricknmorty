import { MetaReducer, ActionReducerMap } from '@ngrx/store';
import { isDevMode } from '@angular/core';
import { routerReducer } from '@ngrx/router-store';

export interface AppState {}

export const reducers: ActionReducerMap<AppState> = {
  router: routerReducer
}

export const metaReducers: MetaReducer<AppState>[] = isDevMode() ? [] : [];