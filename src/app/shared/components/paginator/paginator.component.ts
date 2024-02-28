import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Location } from '@angular/common';
import { Info } from '../../interfaces/main.interface';
import { Output, EventEmitter } from '@angular/core';
import { CustomButtons } from '../../interfaces/utils.interface';
import { config } from '../../../app.constant';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.scss'
})

export class PaginatorComponent implements OnInit {

  @Input() pagination: Info;
  @Input() customButtons: CustomButtons[];

  @Output() prevEvent = new EventEmitter<string>();
  @Output() nextEvent = new EventEmitter<string>();

  currentPage: number;

  constructor(private location: Location) {}

  ngOnInit() {
    // use it for paginations of items
    if (this.pagination) {
      this.calculateCurrentPage(this.pagination.next);
    }
  }

  /**
   * emit next page event
   */
  public goNextPage() {
    this.nextEvent.emit(this.pagination.next);
  }

  /**
   * emit prev page event
   */
  public goPrevPage() {
    this.prevEvent.emit(this.pagination.prev);
  }

  /**
   * different action the custom button can take
   * @param action button action string
   */
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

  /**
   * Detects if there is any change on the inputs and check the page again
   * @param changes changes from input
   */
  public ngOnChanges(changes: SimpleChanges) {
    if (changes['pagination'] && !changes['pagination'].firstChange) {
      this.calculateCurrentPage(this.pagination.next);
    }
  }

  private calculateCurrentPage(url: string): void {
    const urlSearchParams = new URLSearchParams(url.split('?')[1]);
    const page = urlSearchParams.get("page");

    this.currentPage = page ? parseInt(page, 10) - 1 : 0;
  }
}
