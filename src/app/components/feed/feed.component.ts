import { NgTemplateOutlet } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { YouTubePlayer } from '@angular/youtube-player';
import { Store } from '@ngrx/store';
import { Post } from 'src/app/models/post.interface';
import { DatabaseService } from 'src/app/services/database/database.service';
import { HorizontalLineComponent } from 'src/app/shared/horizontal-line/horizontal-line.component';

@Component({
  selector: 'angular-post-feed',
  standalone: true,
  imports: [
    HttpClientModule,
    HorizontalLineComponent,
    YouTubePlayer,
    NgTemplateOutlet,
  ],
  templateUrl: './feed.component.html',
  styles: ``,
})
export default class FeedComponent {
  store = inject(Store<{ posts: Post[] }>);
  databaseService = inject(DatabaseService);
  posts = signal<Post[]>([]);

  constructor() {
    this.databaseService.getPosts().then(() =>
      this.store.subscribe((data: { posts: Post[] }) => {
        this.posts.set(data.posts);
      })
    );
  }
}
