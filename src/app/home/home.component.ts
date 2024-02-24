import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, filter, switchMap } from 'rxjs/operators';
import { MainService } from '../shared/services/main.service';
import { Main, Character } from '../shared/interfaces/main.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  public data$: Observable<Main> = new Observable<Main>();
  public filteredData$: Observable<Character[]> = new Observable<Character[]>();
  public error: any;

  constructor(private service: MainService) {}

  ngOnInit() {
    this.loadItems();
  }

  public loadItems(page: number = 1): void {
    this.data$ = this.service.getItems(page);
  }

  public searchByName(): void {
    this.filteredData$ = this.data$.pipe(
      map((result: any) => {
        return result.results.filter((item: Character) => item.name === 'Rick Sanchez');
      })
    );
  }

}
