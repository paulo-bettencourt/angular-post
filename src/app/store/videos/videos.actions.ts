import { createActionGroup, props } from '@ngrx/store';
import { Video } from 'src/app/models/videos.interface';

// export const setVideos = createAction('[Videos Component] Set videos', props<{ videos: Video[] }>() );

export const VideosApiActions = createActionGroup({
  source: 'Videos API',
  events: {
    'Retrieved Videos List': props<{ videos: ReadonlyArray<Video> }>(),
  },
});