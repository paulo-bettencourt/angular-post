import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'angular-post-auth',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export default class RegisterComponent {
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
      this.apiService.register(auth).subscribe((data: any) => {
        this.isLogged = true;
        this.view = data.auth;
      });
    } else {
      // Form is invalid, handle accordingly
    }
  }
}
