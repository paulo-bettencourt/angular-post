import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FooterComponent } from './shared/footer/footer.component';
import { HeaderComponent } from './shared/header/header.component';
import { MenuComponent } from './shared/menu/menu.component';

@Component({
  standalone: true,
  imports: [RouterModule, HeaderComponent, MenuComponent, FooterComponent],
  selector: 'angular-post-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'angular-post';
}
