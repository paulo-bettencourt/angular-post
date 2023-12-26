import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, NgZone } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HorizontalLineComponent } from '../horizontal-line/horizontal-line.component';

@Component({
  selector: 'angular-post-header',
  standalone: true,
  imports: [CommonModule, HorizontalLineComponent, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  zone = inject(NgZone);

  isVisible = false;

  toggleMenu() {
    this.isVisible = !this.isVisible;
  }
}
