import { Component, Input, ViewEncapsulation } from '@angular/core';

/**
 * A component that provides a basic layout for card info elements
 * 
 * @usagenotes
 * 
 * ### Usage in the App
 * 
 * ```html
 *  <app-card>
 *  <!--left side -->
 *  <img card-avatar [src]="urlImage" />
 * 
 *  <!-- right side -->
 *  <!-- heaader -->
 *  <span card-title> {{ title }} </span>
 *  <span card-subtitle> {{ subtitle }} </span>
 * 
 * <!-- body -->
 * <div card-body>
 *  <p> {{item.firstName}} </p>
 *  <p> {{item.lastName}} </p>
 *  <p> {{item.city}} </p>
 * </div>
 * ```
 */

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  host: { class: 'c-card' },
  encapsulation: ViewEncapsulation.None
})

export class CardComponent {

}
