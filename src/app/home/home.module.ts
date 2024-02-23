import { NgModule } from "@angular/core";
import { HomeComponent } from './home.component';
import { SharedModule } from '../shared/shared.module';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      { path: '', component: HomeComponent },
    ])
  ],
  declarations: [
    HomeComponent
  ],
})

export class HomeModule {
  constructor() {}
}