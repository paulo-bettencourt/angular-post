import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  Auth,
  GoogleAuthProvider,
  fetchSignInMethodsForEmail,
  getAuth,
  getRedirectResult,
} from 'firebase/auth';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { getDatabase, set, ref, onValue } from 'firebase/database';

@Component({
  selector: 'angular-post-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export default class DashboardComponent implements OnInit {
  authService = inject(AuthService);
  activatedRoute = inject(ActivatedRoute);
  auth = this.authService.getAuth();
  router = inject(Router);
  displayName = signal<string | null>('');
  email = signal<string | null>('');
  data: any;

  ngOnInit(): void {
    this.auth.onAuthStateChanged((user) => {
      user ? this.displayName.set(user.displayName) : null;
      user ? this.email.set(user.email) : null;
    });
  }

  signOut() {
    this.auth.signOut();
    this.authService.setData(false);
    this.router.navigate(['/login']);
  }

  firebase() {
    const db = getDatabase();
    console.log('database: ', db);
    // set(ref(db, 'posts/' + new Date().getMilliseconds()), {
    //   id: new Date().getMilliseconds(),
    //   username: 'name222',
    //   email: 'email',
    //   profile_picture: 'imageUrl',
    // });

    const starCountRef = ref(db, 'videos');
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      console.log('DATA: ', data);
      this.data = data;
    });
    console.log(
      'OBJETO: ',
      onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();
        console.log('DATA: ', data);
        this.data = data;
      })
    );
  }
}
