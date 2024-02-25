import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Form } from '@angular/forms';
import { Observable, of, EMPTY } from 'rxjs';
import { tap, map, switchMap, catchError } from 'rxjs/operators';
import { MainService } from '../shared/services/main.service';
import { Main, Character } from '../shared/interfaces/main.interface';

import { Store, select } from '@ngrx/store';
import { storeInfo } from './home.actions';
import { HomeState } from './reducers';
import { hasData } from './home.selectors';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  public data$: Observable<Main> = new Observable<Main>();
  public test$: Observable<Main> = new Observable<Main>();

  public filteredData$: Observable<Character[]> = new Observable<Character[]>();
  public error: any;
  public searchForm: FormGroup;
  public isTyping: boolean;
  public isStorageEmpty: boolean;

  constructor(
    private service: MainService,
    private fb: FormBuilder,
    private store: Store<HomeState>
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

  public test(): void {
    this.test$ = this.store.pipe(select(hasData));
  }
  
  public filterByName(): void {
    const name = this.searchForm.get('search')?.value;
    this.data$ = this.service.getItemsByName(name);
  }

  public onInputChange(event: Event): void {
    const inputValue = (event.target as HTMLInputElement).value;
    this.isTyping = inputValue.length > 0;
  }

  public clear(): void {
    this.searchForm.get('search')?.setValue('');
    this.isTyping = false;
  }
  
}
