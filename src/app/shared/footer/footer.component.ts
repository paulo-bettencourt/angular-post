import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { HorizontalLineComponent } from '../horizontal-line/horizontal-line.component';

@Component({
  selector: 'angular-post-footer',
  standalone: true,
  imports: [CommonModule, HorizontalLineComponent],
  templateUrl: './footer.component.html',
})
export class FooterComponent {}
