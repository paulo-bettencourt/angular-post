import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'angular-post-auth',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export default class RegisterComponent implements OnInit {
  form = inject(FormBuilder);
  apiService = inject(ApiService);
  router = inject(Router);
  authService = inject(AuthService);
  activatedRoute = inject(ActivatedRoute);
  loginForm = this.form.nonNullable.group({
    username: ['', Validators.compose([Validators.required, Validators.email])],
    password: [
      '',
      Validators.compose([Validators.required, Validators.minLength(3)]),
    ],
  });
  paramsRoute = '';
  isLogged = false;
  view = 'login';

  async ngOnInit(): Promise<void> {
    await new Promise((resolve, reject) => {
      resolve(this.authService.isUserLoggedIn()),
        reject(console.log('ERROR: User is not logged in'));
    })
      .then(() => {
        this.authService.getData().value
          ? this.router.navigate(['/dashboard'])
          : null;
      })
      .catch(() => {
        console.log('User not logged in');
      });
  }

  submitForm() {
    if (this.loginForm.valid) {
      const auth = this.loginForm.value;
      this.apiService.register(auth).subscribe((data: any) => {
        this.isLogged = true;
        this.view = data.auth;
      });
    } else {
      // Form is invalid, handle accordingly
    }
  }
}
