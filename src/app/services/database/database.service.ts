import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, Signal, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { environment } from 'environments/environment';
import { getDatabase, onValue, ref, set } from 'firebase/database';
import { Post } from '../../models/post.interface';
import { PostsApiActions as PostsApiActions } from '../../store/posts.actions';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  http = inject(HttpClient);
  store = inject(Store<{ videos: Post[] }>);
  starCountRef = ref(getDatabase(), 'videos');
  posts = signal<Post[]>;

  async getPosts() {
    await new Promise((resolve, reject) => {
      onValue(this.starCountRef, (snapshot) => {
        const posts = snapshot.val();
        console.log('POSTS: ', posts);
        resolve(
          this.store.dispatch(PostsApiActions.retrievedPostsList({ posts }))
        ),
          reject(null);
      });
    });
  }

  writePost(formData: any) {
    const db = getDatabase();
    console.log('USER DATA TO BE SUBMITTED:', formData);
    set(ref(db, 'videos/' + formData.author), {
      title: formData.title,
      description: formData.description,
      youtubeId: formData.youtubeId,
    });
  }
}
