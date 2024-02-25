import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Form } from '@angular/forms';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { MainService } from '../shared/services/main.service';
import { Main, Character } from '../shared/interfaces/main.interface';
import { AppState } from '../reducers';
import { Store } from '@ngrx/store';
import { listCharacters } from './home.actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  public data$: Observable<Main> = new Observable<Main>();
  public filteredData$: Observable<Character[]> = new Observable<Character[]>();
  public error: any;
  public searchForm: FormGroup;
  public isTyping: boolean;

  constructor(
    private service: MainService,
    private fb: FormBuilder,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.loadItems();
    this.searchForm = this.fb.group({
      search: [''],
    });
  }

  public loadItems(page: number = 1): void {
    this.data$ = this.service.getItems(page);
    this.data$.pipe(
      tap(data => {
        console.log('data', data);
        this.store.dispatch(listCharacters({results: data.results}))
        }
      )
    ).subscribe();
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
