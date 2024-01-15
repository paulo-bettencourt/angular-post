import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { environment } from 'environments/environment';
import { toSignal } from '@angular/core/rxjs-interop';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const isLogged = toSignal(authService.getData());

  return isLogged() ? true : false;
};
