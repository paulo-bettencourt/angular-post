import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

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
  activatedRoute = inject(ActivatedRoute);
  loginForm = this.form.nonNullable.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });
  paramsRoute = '';
  isLogged = false;
  view = 'login'


  submitForm() {
    if (this.loginForm.valid) {
      const auth = this.loginForm.value;
      this.apiService.login(auth).subscribe((data) => {
        this.isLogged = true;
        this.view = data.auth;
      });
    } else {
      // Form is invalid, handle accordingly
    }
  }
}
