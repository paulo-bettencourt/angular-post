import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { Video } from 'src/app/models/videos.interface';
import { FooterComponent } from 'src/app/shared/footer/footer.component';
import { HeaderComponent } from 'src/app/shared/header/header.component';

@Component({
  selector: 'angular-post-home',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {

  store = inject(Store<{ videos: Video[] }>);
  videos = toSignal<Video[]>(this.store.select('videos'));

  constructor() {
    console.log("store: ", this.videos());
  }

}
