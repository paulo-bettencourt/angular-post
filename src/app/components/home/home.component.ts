import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { HorizontalLineComponent } from 'src/app/shared/horizontal-line/horizontal-line.component';
import { signal } from '@angular/core';
import { YouTubePlayer } from '@angular/youtube-player';
import { FooterComponent } from '../../shared/footer/footer.component';

@Component({
  selector: 'angular-post-home',
  standalone: true,
  templateUrl: './home.component.html',
  imports: [CommonModule],
})
export default class HomeComponent {}
