import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MenuComponent } from './shared/menu/menu.component';

@Component({
  standalone: true,
  imports: [RouterModule, MenuComponent],
  selector: 'angular-post-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'angular-post';
}
