import { Injectable } from '@angular/core';
import { getAuth } from 'firebase/auth';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  auth = getAuth();
  private dataSubject$ = new BehaviorSubject<boolean>(false);

  setData(data: boolean): void {
    this.dataSubject$.next(data);
  }

  getData(): BehaviorSubject<boolean> {
    return this.dataSubject$;
  }

  getAuth() {
    return this.auth;
  }

  isUserLoggedIn(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.auth.onAuthStateChanged((user) => {
        resolve(this.dataSubject$.next(!!user));
      });
    });
  }
}
