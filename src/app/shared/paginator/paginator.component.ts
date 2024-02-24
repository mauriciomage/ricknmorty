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
    const page = this.getPage(this.pagination.next);
    this.currentPage = page - 1;
  }

  public goNextPage() {
    this.nextEvent.emit(+this.pagination.next.split('=')[1]);
  }

  public goPrevPage() {
    this.prevEvent.emit(+this.pagination.prev.split('=')[1]);
  }

  private getPage(url: string): number {
    const queryString = url.split('?')[1];
    const queryParams = queryString.split('&');
    return +queryParams[0].split('=')[1];
  }
}
