import { createReducer, on } from '@ngrx/store';
import { Post } from 'src/app/models/videos.interface';

import { PostsApiActions } from './videos.actions';

export const initialState: ReadonlyArray<Post> = [];

export const postsReducer = createReducer(
  initialState,
  on(PostsApiActions.retrievedPostsList, (_state, { posts }) => posts)
);
