import { createReducer, on } from '@ngrx/store';
import { Video } from 'src/app/models/videos.interface';

import { VideosApiActions } from './videos.actions';


export const initialState: ReadonlyArray<Video> = [];

export const booksReducer = createReducer(
  initialState,
  on(VideosApiActions.retrievedVideosList, (_state, { videos }) => videos)
);