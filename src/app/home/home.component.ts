import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MainService } from '../shared/services/main.service';
import { Main } from '../shared/interfaces/main.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  public data$: Observable<Main> = new Observable<Main>();;
  public error: any;

  constructor(private service: MainService) {}

  ngOnInit() {
    this.loadItems();
  }

  private loadItems(): void {
    this.data$ = this.service.getItems();
  }

}
