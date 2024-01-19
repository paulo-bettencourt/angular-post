import { Route } from '@angular/router';
import { authGuard } from './guards/auth.guard';

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
  {
    path: 'dashboard',
    loadComponent: () => import('./components/dashboard/dashboard.component'),
    canActivate: [authGuard],
  },
  {
    path: 'feed',
    loadComponent: () => import('./components/feed/feed.component'),
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];
