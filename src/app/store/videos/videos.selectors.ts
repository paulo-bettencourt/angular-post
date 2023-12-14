import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Video } from 'src/app/models/videos.interface';

export const selectVideosState = createFeatureSelector<
  ReadonlyArray<Video>
>('videos');

export const selectVideos = createSelector(
  selectVideosState,
  (videos) =>  videos);