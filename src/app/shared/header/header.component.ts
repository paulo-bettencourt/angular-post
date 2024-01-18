import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  inject,
  NgZone,
  OnInit,
  signal,
} from '@angular/core';
import { RouterModule } from '@angular/router';

import { HorizontalLineComponent } from '../horizontal-line/horizontal-line.component';
import { AuthService } from 'src/app/services/auth.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'angular-post-header',
  standalone: true,
  imports: [CommonModule, HorizontalLineComponent, RouterModule],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  authService = inject(AuthService);
  auth = this.authService.getAuth();
  isLogged$: BehaviorSubject<boolean> = this.authService.getData();
  isVisible = false;

  toggleMenu() {
    this.isVisible = !this.isVisible;
  }
}
