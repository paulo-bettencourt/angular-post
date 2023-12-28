import { Route } from '@angular/router';

export const appRoutes: Route[] = [{
  path: '',
  loadComponent: () => import('./components/home/home.component')
},
{
  path: 'authentication',
  loadComponent: () => import('./admin/auth/auth.component')
},
{
  path: 'about',
  loadComponent: () => import('./components/about/about.component')
}];
