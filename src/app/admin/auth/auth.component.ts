import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'angular-post-auth',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export default class AuthComponent {
  form = inject(FormBuilder);
  apiService = inject(ApiService);
  activatedRoute = inject(ActivatedRoute);
  loginForm = this.form.nonNullable.group({
    username: [''],
    password: [''],
  });

  submitForm() {
    let paramsRoute = '';
    this.activatedRoute.paramMap.subscribe((data: any) => {
      console.log('AUTHHHH ', data.params?.auth); // Use optional chaining to avoid 'undefined' error
      paramsRoute = data.params?.auth || ''; // Use optional chaining and default to an empty string
    });
    
    console.log('----> ', paramsRoute);
    
    if (this.loginForm.valid) {
      const auth = this.loginForm.value;
      this.apiService.authentication(auth, paramsRoute).subscribe((data) => {
        console.log('LOGIN: ', data);
      });
    } else {
      // Form is invalid, handle accordingly
    }
  }
}
