import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import HomeComponent from './components/home/home.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HeaderComponent } from './shared/header/header.component';
import { MenuComponent } from './shared/menu/menu.component';
import { environment } from 'environments/environment';
import { initializeApp } from 'firebase/app';
import { connectAuthEmulator, getAuth } from 'firebase/auth';
import { getDatabase, connectDatabaseEmulator } from 'firebase/database';

try {
  initializeApp(environment.firebaseConfig);
  connectAuthEmulator(getAuth(), 'http://localhost:9099', {
    disableWarnings: true,
  });
  connectDatabaseEmulator(getDatabase(), 'localhost', 9000);
} catch {}

@Component({
  standalone: true,
  selector: 'angular-post-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [
    RouterModule,
    MenuComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
  ],
})
export class AppComponent {}
