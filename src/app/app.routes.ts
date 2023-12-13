import { Route } from '@angular/router';

import { HomeComponent } from './components/home/home.component';

export const appRoutes: Route[] = [{
  path: '',
  loadComponent: () => import('./components/home/home.component').then(() => HomeComponent)
}];
