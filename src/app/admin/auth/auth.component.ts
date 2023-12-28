import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'angular-post-auth',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export default class AuthComponent implements OnInit {
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

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((data: any) => {
      this.paramsRoute = data.params?.auth.slice(0,1).toUpperCase() + data.params?.auth.slice(1); 
    });
  }

  submitForm() {
    if (this.loginForm.valid) {
      const auth = this.loginForm.value;
      this.apiService.authentication(auth, this.paramsRoute).subscribe((data) => {
        this.isLogged = true;
      });
    } else {
      // Form is invalid, handle accordingly
    }
  }
}
