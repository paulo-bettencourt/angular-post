import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { Post } from 'src/app/models/videos.interface';
import { ApiService } from 'src/app/services/api.service';
import { HorizontalLineComponent } from 'src/app/shared/horizontal-line/horizontal-line.component';
import { PostsApiActions } from 'src/app/store/videos/videos.actions';
import { signal } from '@angular/core';

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
    FooterComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class HomeComponent {
  store = inject(Store<{ posts: Post[] }>);
  videos$ = this.store.select('posts');
  sanitizer = inject(DomSanitizer);
  apiService = inject(ApiService);
  posts = signal<any[]>([]);

  constructor() {
    this.apiService
      .getPosts()
      .then(() => this.store.subscribe((data) => console.log('STORE: ', data)));
    // this.apiService
    //   .getVideos()
    //   .pipe()
    //   .subscribe((videos) => {
    //     console.log('fetch request: ', videos),

    // //    this.store.subscribe((data) => console.log('STORE: ', data));
    //   });

    // const posts: any = this.apiService.getPosts();
    // this.posts.set(posts);
    // console.log('posts signal: ', this.apiService.getPosts());
    //  this.store.dispatch(VideosApiActions.retrievedVideosList(posts));
  }

  sanitizeVideo(url: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
