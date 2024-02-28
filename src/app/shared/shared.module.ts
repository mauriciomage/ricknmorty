import { NgModule } from "@angular/core";
import { CardComponent } from './components/card/card.component';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { StatusComponent } from './components/status/status.component';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from './components/spinner/spinner.component';

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