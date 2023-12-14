import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { DomSanitizer } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { Video } from 'src/app/models/videos.interface';
import { FooterComponent } from 'src/app/shared/footer/footer.component';
import { HeaderComponent } from 'src/app/shared/header/header.component';
import { HorizontalLineComponent } from 'src/app/shared/horizontal-line/horizontal-line.component';

@Component({
  selector: 'angular-post-home',
  standalone: true,
  imports: [CommonModule, HeaderComponent, HorizontalLineComponent, FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {

  store = inject(Store<{ videos: Video[] }>);
  videos = toSignal<Video[]>(this.store.select('videos'));
  sanitizer = inject(DomSanitizer);
  
  constructor() {
    console.log("store: ", this.videos());
  }

  sanitizeVideo(url: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url)
  }

}
