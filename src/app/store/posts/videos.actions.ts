import { createActionGroup, props } from '@ngrx/store';
import { Post } from 'src/app/models/post.interface';

// export const setVideos = createAction('[Videos Component] Set videos', props<{ videos: Video[] }>() );

export const PostsApiActions = createActionGroup({
  source: 'Posts API',
  events: {
    'Retrieved Posts List': props<{ posts: ReadonlyArray<Post> }>(),
  },
});
