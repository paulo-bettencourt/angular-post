import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HeaderComponent } from './shared/header/header.component';
import { MenuComponent } from './shared/menu/menu.component';

@Component({
    standalone: true,
    selector: 'angular-post-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [RouterModule, MenuComponent, HomeComponent, HeaderComponent, FooterComponent]
})
export class AppComponent {
  title = 'angular-post';
}
