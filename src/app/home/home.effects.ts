import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { HomeState } from './reducers';
import { tap } from 'rxjs/operators';
import { HomeActions } from './action-type';

@Injectable()
export class HomeEffects {

  public storeInfo$ = createEffect(() => this.action$
  .pipe(
    ofType(HomeActions.storeInfo),
    tap((action: HomeState) => localStorage.setItem('data', JSON.stringify(action.data)))
  ),
  {dispatch: false}); // is not going to impact another action. Avoid accidentals loops

  constructor(private action$: Actions) {
    
  }
}