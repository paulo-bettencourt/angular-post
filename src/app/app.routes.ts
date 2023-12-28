import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () => import('./components/home/home.component'),
  },
  {
    path: 'login',
    loadComponent: () => import('./admin/login/login.component'),
  },
  {
    path: 'register',
    loadComponent: () => import('./admin/register/register.component'),
  },
  {
    path: 'about',
    loadComponent: () => import('./components/about/about.component'),
  },
];
