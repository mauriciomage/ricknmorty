import { NgModule } from "@angular/core";
import { CardComponent } from '../shared/card/card.component';
import { PaginatorComponent } from './paginator/paginator.component';
import { StatusComponent } from './status/status.component';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from './spinner/spinner.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    CardComponent,
    PaginatorComponent,
    StatusComponent,
    SpinnerComponent
  ],
  exports: [
    CardComponent,
    PaginatorComponent,
    StatusComponent,
    SpinnerComponent
  ]
})

export class SharedModule {}