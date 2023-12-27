import { Route } from '@angular/router';

export const appRoutes: Route[] = [{
  path: '',
  loadComponent: () => import('./components/home/home.component')
},
{
  path: 'login',
  loadComponent: () => import('./admin/auth/auth.component')
},
{
  path: 'about',
  loadComponent: () => import('./components/about/about.component')
},
{
  path: 'register',
  loadComponent: () => import('./admin/register/register.component')
}];
