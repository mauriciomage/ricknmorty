import { NgModule } from "@angular/core";
import { SharedModule } from '../shared/shared.module';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DetailsComponent } from './details.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromDetails from './reducers';
import { DetailsEffects } from './details.effects';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      { path: '', component: DetailsComponent },
    ]),
    StoreModule.forFeature(fromDetails.detailsFeatureKey, fromDetails.detailsReducer),
    EffectsModule.forFeature([DetailsEffects])
  ],
  declarations: [
    DetailsComponent
  ],
})

export class DetailModule {
  constructor() {}
}