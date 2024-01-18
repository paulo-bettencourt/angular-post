import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'angular-post-auth',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
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
  isLogged = false;

  async ngOnInit(): Promise<void> {
    await this.authService
      .isUserLoggedIn()
      .then(() => {
        this.router.navigate(['/dasboard']);
      })
      .catch(() => {
        null;
      });
  }

  submitForm() {
    if (this.loginForm.valid) {
      const auth = this.loginForm.value;
      // this.apiService.register(auth).subscribe((data: any) => {
      //   this.isLogged = true;
      // });
    } else {
      // Form is invalid, handle accordingly
    }
  }
}
