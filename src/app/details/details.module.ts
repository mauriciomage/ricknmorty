import { NgModule } from "@angular/core";
import { SharedModule } from '../shared/shared.module';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DetailsComponent } from './details.component';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      { path: '', component: DetailsComponent },
    ]),
  ],
  declarations: [
    DetailsComponent
  ],
})

export class DetailModule {
  constructor() {}
}