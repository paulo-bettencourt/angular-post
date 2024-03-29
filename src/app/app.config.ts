import { provideHttpClient, withFetch } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideStore, StoreModule } from '@ngrx/store';

import { appRoutes } from './app.routes';
import { postsReducer } from './store/posts.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withFetch()),
    provideEffects(),
    provideStore(),
    provideClientHydration(),
    provideRouter(appRoutes),
    importProvidersFrom(StoreModule.forRoot({ posts: postsReducer })),
  ],
};
