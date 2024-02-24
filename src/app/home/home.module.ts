import { NgModule } from "@angular/core";
import { HomeComponent } from './home.component';
import { SharedModule } from '../shared/shared.module';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
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