import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { Post } from 'src/app/models/post.interface';
import { ApiService } from 'src/app/services/api.service';
import { HorizontalLineComponent } from 'src/app/shared/horizontal-line/horizontal-line.component';
import { signal } from '@angular/core';
import { YouTubePlayer } from '@angular/youtube-player';
import { FooterComponent } from '../../shared/footer/footer.component';

@Component({
  selector: 'angular-post-home',
  standalone: true,
  templateUrl: './home.component.html',
  imports: [
    CommonModule,
    HttpClientModule,
    HorizontalLineComponent,
    FooterComponent,
    YouTubePlayer,
  ],
})
export default class HomeComponent {
  store = inject(Store<{ posts: Post[] }>);
  apiService = inject(ApiService);
  posts = signal<Post[]>([]);

  constructor() {
    this.apiService.getPosts().then(() =>
      this.store.subscribe((data: { posts: Post[] }) => {
        this.posts.set(data.posts);
      })
    );
  }
}
