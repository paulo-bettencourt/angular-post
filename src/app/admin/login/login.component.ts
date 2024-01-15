import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { environment } from 'environments/environment';
import { initializeApp } from 'firebase/app';
import {
  Auth,
  browserLocalPersistence,
  browserSessionPersistence,
  connectAuthEmulator,
  FacebookAuthProvider,
  getAuth,
  GoogleAuthProvider,
  inMemoryPersistence,
  setPersistence,
  signInWithEmailAndPassword,
  signInWithPopup,
  signInWithRedirect,
} from 'firebase/auth';
import { ApiService } from 'src/app/services/api.service';

initializeApp(environment.firebaseConfig);
connectAuthEmulator(getAuth(), 'http://127.0.0.1:9099', {
  disableWarnings: true,
});

@Component({
  selector: 'angular-post-auth',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export default class LoginComponent implements OnInit {
  form = inject(FormBuilder);
  apiService = inject(ApiService);
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);
  loginForm = this.form.nonNullable.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });
  paramsRoute = '';
  isLogged: boolean | null = null;
  view = 'login';
  auth = getAuth();
  provider = new GoogleAuthProvider();
  authenticationChecked = false;

  ngOnInit(): void {
    console.log('isLogged: ', this.isLogged);
    this.isUserLoggedIn();

    this.form.nonNullable.group({
      email: ['', Validators.required, Validators.email],
      password: ['', Validators.required, Validators.minLength(4)],
    });
  }

  isUserLoggedIn(): void {
    this.auth.onAuthStateChanged((user) => {
      user ? (this.isLogged = true) : (this.isLogged = false);
    });
  }

  signOut() {
    this.auth.signOut();
    console.log('auth sign out: ', this.auth.currentUser);
    this.isLogged = false;
    console.log('auth sign out: ', this.isLogged);
  }

  submitForm() {
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;

    if (email && password) {
      setPersistence(this.auth, browserLocalPersistence)
        .then(() => {
          this.isLogged = true;
          console.log('promess');
          return signInWithEmailAndPassword(this.auth, email, password);
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
    signInWithPopup(this.auth, this.provider)
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
