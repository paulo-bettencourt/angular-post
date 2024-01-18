import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'angular-post-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
})
export default class DashboardComponent implements OnInit {
  authService = inject(AuthService);
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  auth = this.authService.getAuth();
  displayName = signal<string | null>('');
  email = signal<string | null>('');

  ngOnInit() {
    this.auth.onAuthStateChanged((user) => {
      user ? this.displayName.set(user.displayName) : null;
      user ? this.email.set(user.email) : null;
    });
  }

  signOut() {
    this.auth.signOut();
    this.authService.setData(false);
    this.router.navigate(['/login']);
  }
}
