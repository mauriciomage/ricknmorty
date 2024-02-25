import { Routes } from '@angular/router';

export const ROUTES: Routes = [
  {
    path: '', 
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'details/:id', 
    loadChildren: () => import('./details/details.module').then((m) => m.DetailModule
    ),
  }
];
