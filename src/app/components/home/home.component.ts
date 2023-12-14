import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { Video } from 'src/app/models/videos.interface';
import { ApiService } from 'src/app/services/api.service';
import { FooterComponent } from 'src/app/shared/footer/footer.component';
import { HeaderComponent } from 'src/app/shared/header/header.component';
import { HorizontalLineComponent } from 'src/app/shared/horizontal-line/horizontal-line.component';
import { VideosApiActions } from 'src/app/store/videos/videos.actions';

@Component({
  selector: 'angular-post-home',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    HeaderComponent,
    HorizontalLineComponent,
    FooterComponent,
  ],
  providers: [ApiService],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent  {
  store = inject(Store<{ videos: Video[] }>);
  videos$ = this.store.select('videos');
  sanitizer = inject(DomSanitizer);
  apiService = inject(ApiService);

  constructor() {
    this.apiService.getVideos().pipe(
    ).subscribe((videos) => {
        console.log('fetch request: ', videos),
        this.store.dispatch(VideosApiActions.retrievedVideosList({videos}));
        this.store.subscribe(data => console.log("STORE: ", data))
    });
  }

  sanitizeVideo(url: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
