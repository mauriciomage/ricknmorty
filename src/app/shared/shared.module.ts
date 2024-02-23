import { NgModule } from "@angular/core";
import { CardComponent } from '../shared/card/card.component';

@NgModule({
  declarations: [
    CardComponent
  ],
  exports: [
    CardComponent
  ]
})

export class SharedModule {}