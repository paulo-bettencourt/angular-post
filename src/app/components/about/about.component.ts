import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'angular-post-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export default class AboutComponent {}
