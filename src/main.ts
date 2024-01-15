import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { environment } from 'environments/environment';
import { initializeApp } from 'firebase/app';
import { connectAuthEmulator, getAuth } from 'firebase/auth';

initializeApp(environment.firebaseConfig);
connectAuthEmulator(getAuth(), 'http://127.0.0.1:9099', {
  disableWarnings: true,
});

bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err)
);
