import { Injectable } from '@angular/core';
import { Auth, getAuth } from 'firebase/auth';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  auth = getAuth();
  userEmail!: string;
  private dataSubject$ = new BehaviorSubject<boolean>(false);

  setData(data: boolean): void {
    this.dataSubject$.next(data);
  }

  getData(): BehaviorSubject<boolean> {
    return this.dataSubject$;
  }

  getAuth(): Auth {
    return this.auth;
  }

  getUserEmail(): string {
    return this.userEmail;
  }

  setUserEmail(email: string): void {
    console.log('E-MAIL SETTADO: ', email);
    this.userEmail = email;
  }

  isUserLoggedIn(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.auth.onAuthStateChanged((user) => {
        console.log('USER: ', this.userEmail);
        !!user ? resolve(true) : reject(false);
      });
    });
  }
}
