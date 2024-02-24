import { Component, Input, OnInit } from '@angular/core';
import { Info } from '../interfaces/main.interface';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.scss'
})

export class PaginatorComponent implements OnInit {

  @Input() pagination: Info;

  @Output() prevEvent = new EventEmitter<number>();
  @Output() nextEvent = new EventEmitter<number>();

  currentPage: number;

  constructor() {}

  ngOnInit() {
    this.calculateCurrentPage();
  }

  private calculateCurrentPage(): void {
    this.currentPage = +this.pagination.next.split('=')[1] - 1;
  }

  public goNextPage() {
    this.nextEvent.emit(+this.pagination.next.split('=')[1]);
  }

  public goPrevPage() {
    this.prevEvent.emit(+this.pagination.prev.split('=')[1]);
  }
}
