import {Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: "",
    loadComponent: () => import('./blog'),
  },
  {
    path: "blog/:id/:title",
    loadComponent: () => import('./blog'),
  }
];
