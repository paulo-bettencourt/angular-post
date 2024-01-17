import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, Signal, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { environment } from 'environments/environment';
import { getDatabase, onValue, ref } from 'firebase/database';
import { Post } from '../models/post.interface';
import { PostsApiActions as PostsApiActions } from '../store/posts/videos.actions';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  http = inject(HttpClient);
  starCountRef = ref(getDatabase(), 'videos');
  posts = signal<Post[]>;
  store = inject(Store<{ videos: Post[] }>);

  async getPosts() {
    await new Promise((resolve, reject) => {
      onValue(this.starCountRef, (snapshot) => {
        const posts = snapshot.val();
        resolve(
          this.store.dispatch(PostsApiActions.retrievedPostsList({ posts }))
        ),
          reject(null);
      });
    });
  }
}
