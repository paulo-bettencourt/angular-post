import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'angular-post-auth',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export default class AuthComponent {}
