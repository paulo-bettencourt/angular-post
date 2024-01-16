import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import {
  Auth,
  browserLocalPersistence,
  getAuth,
  GoogleAuthProvider,
  setPersistence,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'angular-post-auth',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export default class LoginComponent {
  provider = new GoogleAuthProvider();
  auth = getAuth();
  apiService = inject(ApiService);
  router = inject(Router);
  authService = inject(AuthService);
  activatedRoute = inject(ActivatedRoute);
  form = inject(FormBuilder);
  loginForm = this.form.nonNullable.group({
    email: ['', Validators.compose([Validators.required, Validators.email])],
    password: [
      '',
      Validators.compose([Validators.required, Validators.minLength(3)]),
    ],
  });
  paramsRoute = '';
  isLogged: boolean | null = null;
  view = 'login';

  ngOnInit(): void {
    this.isUserLoggedIn();
  }

  isUserLoggedIn(): void {
    this.auth.onAuthStateChanged((user) => {
      this.authService.setData(!!user);
      user ? this.router.navigate(['/dashboard']) : null;
    });
  }

  submitForm() {
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;

    if (email && password) {
      setPersistence(this.auth, browserLocalPersistence)
        .then(() => {
          this.authService.setData(true);
          return signInWithEmailAndPassword(this.auth, email, password);
        })
        .then(() => {
          this.router.navigate(['/dashboard']);
        })
        .catch((error) => {
          this.isLogged = false;
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log('Error Msg: ', errorMessage);
          console.log('Error Code: ', errorCode);
        });
    }
  }

  signInGoogle() {
    setPersistence(this.auth, browserLocalPersistence)
      .then(() => {
        return signInWithPopup(this.auth, this.provider);
      })
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        const user = result.user;
        this.router.navigate(['/about']);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  }
}
