import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { Post } from 'src/app/models/post.interface';
import { ApiService } from 'src/app/services/api.service';
import { HorizontalLineComponent } from 'src/app/shared/horizontal-line/horizontal-line.component';
import { signal } from '@angular/core';

import { FooterComponent } from '../../shared/footer/footer.component';

@Component({
  selector: 'angular-post-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  imports: [
    CommonModule,
    HttpClientModule,
    HorizontalLineComponent,
    FooterComponent,
  ],
})
export default class HomeComponent {
  store = inject(Store<{ posts: Post[] }>);
  sanitizer = inject(DomSanitizer);
  apiService = inject(ApiService);
  posts = signal<any[]>([]);

  constructor() {
    this.apiService.getPosts().then(() =>
      this.store.subscribe((data) => {
        this.posts.set(data.posts);
      })
    );
  }

  sanitizeVideo(url: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
