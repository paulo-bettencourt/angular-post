import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'angular-post-horizontal-line',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './horizontal-line.component.html',
})
export class HorizontalLineComponent {
  @Input({ required: true }) width!: string;
}
