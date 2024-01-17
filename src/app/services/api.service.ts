import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, Signal, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { environment } from 'environments/environment';
import { getDatabase, onValue, ref } from 'firebase/database';
import { Post } from '../models/videos.interface';
import { PostsApiActions as PostsApiActions } from '../store/videos/videos.actions';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  http = inject(HttpClient);
  db = getDatabase();
  starCountRef = ref(this.db, 'videos');
  posts = signal([]);
  store = inject(Store<{ videos: Post[] }>);

  async getPosts() {
    await new Promise((resolve, reject) => {
      onValue(this.starCountRef, (snapshot) => {
        const posts = snapshot.val();
        console.log('DATA do emulador: ', posts);
        resolve(
          this.store.dispatch(PostsApiActions.retrievedPostsList({ posts }))
        ),
          reject(null);
      });
    });
    return this.posts();
  }

  getVideos() {
    return this.http.get<any>(environment.API_POSTS);
  }
}
