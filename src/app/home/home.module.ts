import { NgModule } from "@angular/core";
import { HomeComponent } from './home.component';
import { SharedModule } from '../shared/shared.module';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import * as fromHome from './reducers';
import { EffectsModule } from '@ngrx/effects';
import { HomeEffects } from './home.effects';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: '', component: HomeComponent },
    ]),
    StoreModule.forFeature(fromHome.homeFeatureKey, fromHome.homeReducer),
    EffectsModule.forFeature([HomeEffects])
  ],
  declarations: [
    HomeComponent
  ],
})

export class HomeModule {
  constructor() {}
}