import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, MatToolbarModule],
  templateUrl: 'app.component.html',
  styleUrl:'app.component.css'
})

export class AppComponent {
  title = 'angular-course-project';
}

