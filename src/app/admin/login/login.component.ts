import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { environment } from 'environments/environment';
import { initializeApp } from 'firebase/app';
import {
  Auth,
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
  isLogged = false;
  view = 'login';
  auth = getAuth();
  provider = new GoogleAuthProvider();

  ngOnInit(): void {
    this.isUserLoggedIn();
  }

  isUserLoggedIn() {
    this.auth.onAuthStateChanged((user) => {
      if (user) {
        this.isLogged = true;
      } else {
        this.isLogged = false;
      }
    });
  }

  signOut() {
    this.auth.signOut();
    console.log('auth sign out: ', this.auth.currentUser);
  }

  submitForm() {
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;

    if (email && password) {
      setPersistence(this.auth, browserSessionPersistence)
        .then(() => {
          this.isLogged = true;
          return signInWithEmailAndPassword(this.auth, email, password);
        })
        .catch((error) => {
          this.isLogged = false;
          const errorCode = error.code;
          const errorMessage = error.message;
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
