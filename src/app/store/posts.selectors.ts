import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Post } from 'src/app/models/post.interface';

export const selectPostsState =
  createFeatureSelector<ReadonlyArray<Post>>('posts');

export const selectPosts = createSelector(selectPostsState, (posts) => posts);
