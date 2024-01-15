import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { getAuth } from 'firebase/auth';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'angular-post-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export default class DashboardComponent {
  auth = getAuth();
  authService = inject(AuthService);
  router = inject(Router);

  signOut() {
    this.auth.signOut();
    this.authService.setData(false);
    this.router.navigate(['/login']);
  }
}
