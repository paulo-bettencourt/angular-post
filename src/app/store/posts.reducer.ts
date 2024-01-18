import { createReducer, on } from '@ngrx/store';
import { Post } from 'src/app/models/post.interface';

import { PostsApiActions } from './posts.actions';

export const initialState: ReadonlyArray<Post> = [];

export const postsReducer = createReducer(
  initialState,
  on(PostsApiActions.retrievedPostsList, (_state, { posts }) => posts)
);
