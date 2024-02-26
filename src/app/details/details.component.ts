import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MainService } from '../shared/services/main.service';
import { Character } from '../shared/interfaces/main.interface';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { CustomButtons } from '../shared/interfaces/utils.interface';
import { Store } from '@ngrx/store';
import { storeDetails } from './details.actions';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit {

  public details$: Observable<Character>;
  public utilsButtons: CustomButtons[] = [];

  constructor(
      private route: ActivatedRoute,
      private service: MainService,
      private store: Store) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.getDetails(id);
    });
    this.setUtilButtons();
    this.utilsButtons.push();
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

  private setUtilButtons(): void {
    const backButton: CustomButtons = {id: 'details_back_btn', label: 'Back', action: 'back'};
    // add more button as you need
    this.utilsButtons.push(backButton);
  }
}
