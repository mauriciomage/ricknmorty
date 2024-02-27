import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { MainService } from '../shared/services/main.service';
import { Main, Character } from '../shared/interfaces/main.interface';

import { Store, select } from '@ngrx/store';
import { storeInfo } from './home.actions';
import { HomeState } from './reducers';
import { hasData } from './home.selectors';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  public data$: Observable<Main> = new Observable<Main>();
  public error$: Observable<string>;
  public searchForm: FormGroup;
  public isFilter: boolean;
  public isStorageEmpty: boolean;

  constructor(
    private service: MainService,
    private fb: FormBuilder,
    private store: Store<HomeState>,
    private route: Router
  ) {}

  ngOnInit() {
    const data = localStorage.getItem('data');
    // if the data is at the Storage load it from there
    if (data) {
      this.store.dispatch(storeInfo({data: JSON.parse(data)}));
      this.data$ = of(JSON.parse(data));
    } else {
      // load from the service
      this.loadItems();
    }
    //init form
    this.searchForm = this.fb.group({
      search: ['', [Validators.pattern(/^[a-zA-Z0-9]*$/)]],
    });
  }

  /**
   * requests items to the service
   * @param page number
   */
  public loadItems(page: number = 1): void {
      this.data$ = this.service.getItems(page);
      this.data$.pipe(
        tap(data => {
          this.store.dispatch(storeInfo({data}));
          }
        )
      ).subscribe();
      this.error$ = this.service.getErrorSubject();
  }
  
  /**
   * Requests items by name
   */
  public filterByName(): void {
    const name = this.searchForm.get('search')?.value;
    if (this.searchForm.valid) {
      this.data$ = this.service.getItemsByName(name);
      this.isFilter = true;
    }
    // service error
    this.error$ = this.service.getErrorSubject();
  }

  /**
   * clear filter and read from state
   */
  public clear(): void {
    this.searchForm.get('search')?.setValue('');

    // read info from the state
    this.data$ = this.store.pipe(select(hasData));
    this.isFilter = false;
  }

  /**
   * navigates to the detail page
   * @param item Character object
   */
  public goToDetails(item: Character): void {
    this.route.navigate([`/details/${item.id}`])
  }
  /**
   * check if has errors
   * @param control search 
   * @returns boolean if has error or not
   */
  public getHasValidFormat(control: AbstractControl): boolean {
    return control.errors ? true : false;
  }
}
