import { Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Info } from '../interfaces/main.interface';
import { Output, EventEmitter } from '@angular/core';
import { CustomButtons } from '../interfaces/utils.interface';
import { config } from '../../app.constant';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.scss'
})

export class PaginatorComponent implements OnInit {

  @Input() pagination: Info;
  @Input() customButtons: CustomButtons[];

  @Output() prevEvent = new EventEmitter<number>();
  @Output() nextEvent = new EventEmitter<number>();

  currentPage: number;

  constructor(private location: Location) {}

  ngOnInit() {
    // use it for paginations of items
    if (this.pagination) {
      this.calculateCurrentPage();
    }
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

  public onAction(action: string): void{
    switch (action) {
      case config.ACTION_BACK:
        this.location.back();
        break;
      // Add more Actions as you need
      default:
        break;
    }
  }

  private getPage(url: string): number {
    const queryString = url.split('?')[1];
    const queryParams = queryString.split('&');
    return +queryParams[0].split('=')[1];
  }
}
