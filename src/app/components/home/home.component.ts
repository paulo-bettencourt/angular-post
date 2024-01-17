import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { Post } from 'src/app/models/post.interface';
import { ApiService } from 'src/app/services/api.service';
import { HorizontalLineComponent } from 'src/app/shared/horizontal-line/horizontal-line.component';
import { PostsApiActions } from 'src/app/store/posts/videos.actions';
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
    this.apiService.getPosts().then(() =>
      this.store.subscribe((data) => {
        console.log('STORE: ', data);
        this.posts.set(data);
        console.log('SIGNAL DO POSTS: ', this.posts());
      })
    );
  }

  sanitizeVideo(url: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
