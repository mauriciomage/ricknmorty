import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

export const ROUTES: Routes = [
  {
    path: '', 
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
  }
];
