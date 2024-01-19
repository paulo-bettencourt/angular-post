import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { HorizontalLineComponent } from '../horizontal-line/horizontal-line.component';
import { AuthService } from 'src/app/services/auth/auth.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'angular-post-header',
  standalone: true,
  imports: [CommonModule, HorizontalLineComponent, RouterModule],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  authService = inject(AuthService);
  router = inject(Router);
  auth = this.authService.getAuth();
  isLogged$: BehaviorSubject<boolean> = this.authService.getData();
  isVisible = false;

  toggleMenu() {
    this.isVisible = !this.isVisible;
  }

  signOut() {
    this.auth.signOut();
    this.authService.setData(false);
    this.router.navigate(['/login']);
  }
}
