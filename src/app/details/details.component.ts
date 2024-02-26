import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MainService } from '../shared/services/main.service';
import { Character } from '../shared/interfaces/main.interface';
import { Observable, of } from 'rxjs';
import { tap, take } from 'rxjs/operators';
import { CustomButtons } from '../shared/interfaces/utils.interface';
import { Store, select } from '@ngrx/store';
import { storeDetails } from './details.actions';
import { makeSelectDetailById } from './details.selectors';
import { initialDetailsState } from './reducers';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit {

  public details$: Observable<Character>;
  public utilsButtons: CustomButtons[] = [];

  private character: Character;

  constructor(
    private route: ActivatedRoute,
    private service: MainService,
    private store: Store) {}

    ngOnInit(): void {
      this.route.params.subscribe(params => {
        const id = params['id'];
        // check if the character with that id exists in the state or localstorage, otherwhise get from service
        this.details$ = this.store.pipe(select(makeSelectDetailById(id)));
        this.details$.pipe(
          take(1),
          tap(details => {
            if (details === initialDetailsState.details) {
              if (this.detailsLocalStorage(id)) {
                this.details$ = of(this.character);
                this.store.dispatch(storeDetails({details: this.character}));
              } else {
                this.getDetails(id);
                
              }
            } else {
              this.details$ = of(details);
            }
          })
        ).subscribe();
         
      });
      this.initUtils();
    }

  public getDetails(id: number): void {
    this.details$ = this.service.getDetails(id);
    this.details$.pipe(
      tap(details => {
        this.store.dispatch(storeDetails({details}))
        }
      )
    ).subscribe();
  }

  private initUtils(): void {
    const backButton: CustomButtons = {id: 'details_back_btn', label: 'Back', action: 'back'};
    // add more button as you need
    this.utilsButtons.push(backButton);
  }

  /**
   * check if there is already in local storage and set to the character property.
   */
  private detailsLocalStorage(filterId: number): boolean {
    const ls = localStorage.getItem('character');
    this.character = ls ? JSON.parse(ls) : null;
    return this.character?.id === +filterId;
  }
}
