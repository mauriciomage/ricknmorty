import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { DetailState } from './reducers';
import { tap } from 'rxjs/operators';
import {  DetailsActions } from './action-type';

@Injectable()
export class DetailsEffects {

  public storeInfo$ = createEffect(() => this.action$
  .pipe(
    ofType(DetailsActions.storeDetails),
    tap((action: DetailState) => localStorage.setItem('character', JSON.stringify(action.details)))
  ),
  {dispatch: false}); // is not going to impact another action. Avoid accidentals loops

  constructor(private action$: Actions) {
    
  }
}