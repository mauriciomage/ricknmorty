import { NgModule } from "@angular/core";
import { CardComponent } from '../shared/card/card.component';
import { PaginatorComponent } from './paginator/paginator.component';
import { StatusComponent } from './status/status.component';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    CardComponent,
    PaginatorComponent,
    StatusComponent
  ],
  exports: [
    CardComponent,
    PaginatorComponent,
    StatusComponent
  ]
})

export class SharedModule {}