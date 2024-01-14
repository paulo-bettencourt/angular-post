import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { environment } from 'environments/environment';
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { ApiService } from 'src/app/services/api.service';

initializeApp(environment.firebaseConfig);

@Component({
  selector: 'angular-post-auth',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export default class LoginComponent {
  form = inject(FormBuilder);
  apiService = inject(ApiService);
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);
  loginForm = this.form.nonNullable.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });
  paramsRoute = '';
  isLogged = false;
  view = 'login';
  auth = getAuth();
  provider = new GoogleAuthProvider();

  // submitForm() {
  //   if (this.loginForm.valid) {
  //     const auth = this.loginForm.value;
  //     this.apiService.login(auth).subscribe((data) => {
  //       this.isLogged = true;
  //       this.view = data.auth;
  //     });
  //   } else {
  //     // Form is invalid, handle accordingly
  //   }
  // }

  submitForm() {
    signInWithPopup(this.auth, this.provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        // ...
        console.log('TOKEN: ', token);
        console.log('USER: ', user);
        this.router.navigate(['/about'])
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  }
}
