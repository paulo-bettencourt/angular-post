import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { HorizontalLineComponent } from '../horizontal-line/horizontal-line.component';

@Component({
  selector: 'angular-post-header',
  standalone: true,
  imports: [CommonModule, HorizontalLineComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {}
