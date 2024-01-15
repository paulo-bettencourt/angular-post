import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { environment } from 'environments/environment';
import { toSignal } from '@angular/core/rxjs-interop';
import { AuthService } from '../services/auth.service';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export const authGuard: CanActivateFn = async () => {
  const auth = getAuth();
  const authService = inject(AuthService);

  try {
    const user = await new Promise((resolve, reject) => {
      const unsubscribe = onAuthStateChanged(
        auth,
        (user) => {
          unsubscribe();
          resolve(user);
        },
        reject
      );
    });

    const isLoggedIn = !!user;
    authService.setData(isLoggedIn);

    console.log('GUARD ', isLoggedIn);

    return isLoggedIn;
  } catch (error) {
    console.error('Error checking authentication state:', error);
    return false;
  }
};
