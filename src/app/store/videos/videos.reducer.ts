import { createReducer, on } from '@ngrx/store';

import { getVideos } from './videos.actions';

export const initialState = [{
  id: 123,
  link: "https://www.youtube.com/embed/v4HkkjXmEMM?si=-EhqAthFjE4-AAhF"
}, {
  id: 123,
  link: "https://www.youtube.com/embed/v4HkkjXmEMM?si=-EhqAthFjE4-AAhF"
},{
  id: 123,
  link: "https://www.youtube.com/embed/v4HkkjXmEMM?si=-EhqAthFjE4-AAhF"
},{
  id: 123,
  link: "https://www.youtube.com/embed/v4HkkjXmEMM?si=-EhqAthFjE4-AAhF"
},{
  id: 123,
  link: "https://www.youtube.com/embed/v4HkkjXmEMM?si=-EhqAthFjE4-AAhF"
},{
  id: 123,
  link: "https://www.youtube.com/embed/v4HkkjXmEMM?si=-EhqAthFjE4-AAhF"
},{
  id: 123,
  link: "https://www.youtube.com/embed/v4HkkjXmEMM?si=-EhqAthFjE4-AAhF"
},{
  id: 123,
  link: "https://www.youtube.com/embed/v4HkkjXmEMM?si=-EhqAthFjE4-AAhF"
},{
  id: 123,
  link: "https://www.youtube.com/embed/v4HkkjXmEMM?si=-EhqAthFjE4-AAhF"
},{
  id: 123,
  link: "https://www.youtube.com/embed/v4HkkjXmEMM?si=-EhqAthFjE4-AAhF"
},{
  id: 123,
  link: "https://www.youtube.com/embed/v4HkkjXmEMM?si=-EhqAthFjE4-AAhF"
}];

export const videosReducer = createReducer(
  initialState,
  on(getVideos, (state) => state),
);