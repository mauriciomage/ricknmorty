import { Component, Input, OnInit } from '@angular/core';
import { Status } from '../../app.constant';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrl: './status.component.scss'
})


export class StatusComponent implements OnInit{
  @Input() status: string;
  
  public isAlive: boolean;
  public isUnknown: boolean;
 
 constructor() {}

 ngOnInit(): void {
  this.status = this.toLowerCase(this.status);
  this.checkStatus();
  
 }

 private toLowerCase(value: string): string {
   return value.toLowerCase();
 }

 private checkStatus(): void {
  this.isUnknown = this.status === Status.UNKNOWN; 
  this.isAlive = this.status === Status.ALIVE;
 }

}
