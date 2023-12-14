import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideStore, StoreModule } from '@ngrx/store';

import { appRoutes } from './app.routes';
import { videosReducer } from './store/videos/videos.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideEffects(),
    provideStore(),
    provideClientHydration(),
    provideRouter(appRoutes),
    importProvidersFrom(StoreModule.forRoot({ videos: videosReducer }))
  ],
};
