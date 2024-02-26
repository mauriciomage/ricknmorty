import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Form } from '@angular/forms';
import { Observable, of, EMPTY } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
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
  public error: any;
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

    this.searchForm = this.fb.group({
      search: [''],
    });
  }

  public loadItems(page: number = 1): void {
      this.data$ = this.service.getItems(page);
      this.data$.pipe(
        tap(data => {
          this.store.dispatch(storeInfo({data}))
          }
        )
      ).subscribe();
    
  }
  
  public filterByName(): void {
    const name = this.searchForm.get('search')?.value;
    this.data$ = this.service.getItemsByName(name);
    this.isFilter = true;
    this.error$ = this.service.getErrorSubject();
  }

  public onInputChange(event: Event): void {
    const inputValue = (event.target as HTMLInputElement).value;
    // is filter and delete the characters from the input
    if (this.isFilter && inputValue.length === 0) {
      this.clear();
    } 
  }

  public clear(): void {
    this.searchForm.get('search')?.setValue('');

    // read info from the state
    this.data$ = this.store.pipe(select(hasData));
    this.isFilter = false;
  }

  public goToDetails(item: Character): void {
    this.route.navigate([`/details/${item.id}`])
  }
  
}
