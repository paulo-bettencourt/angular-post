import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export const authGuard: CanActivateFn = async () => {
  const auth = getAuth();
  const authService = inject(AuthService);
  const router = inject(Router);

  const isLoggedIn: any = await new Promise((resolve, reject) => {
    onAuthStateChanged(
      auth,
      (user) => {
        resolve(user ? true : false);
      },
      reject
    );
  });

  authService.setData(isLoggedIn);

  if (!isLoggedIn) {
    router.navigateByUrl('/home');
  }

  return isLoggedIn;
};
