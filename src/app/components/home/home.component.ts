import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { Video } from 'src/app/models/videos.interface';
import { ApiService } from 'src/app/services/api.service';
import { HorizontalLineComponent } from 'src/app/shared/horizontal-line/horizontal-line.component';
import { VideosApiActions } from 'src/app/store/videos/videos.actions';

import { FooterComponent } from '../../shared/footer/footer.component';

@Component({
    selector: 'angular-post-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    imports: [
        CommonModule,
        HttpClientModule,
        HorizontalLineComponent,
        FooterComponent
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export default class HomeComponent  {
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
