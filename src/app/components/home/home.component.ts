import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FooterComponent } from 'src/app/shared/footer/footer.component';
import { HeaderComponent } from 'src/app/shared/header/header.component';

@Component({
  selector: 'angular-post-home',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
