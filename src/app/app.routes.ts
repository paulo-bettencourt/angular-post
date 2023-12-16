import { Route } from '@angular/router';

import { AuthComponent } from './admin/auth/auth.component';
import { HomeComponent } from './components/home/home.component';

export const appRoutes: Route[] = [{
  path: '',
  loadComponent: () => import('./components/home/home.component').then(() => HomeComponent)
},
{
  path: 'login',
  loadComponent: () => import('./admin/auth/auth.component').then(() => AuthComponent)
}];
