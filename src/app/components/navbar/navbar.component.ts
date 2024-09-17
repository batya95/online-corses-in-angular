import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';



@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, MatButtonModule, MatToolbarModule],
  templateUrl: './navbar.component.html',
  styles: [`
  .spacer {
      flex: 1 1 auto;
    }
  `]
})
export class NavbarComponent {
  constructor(private userService: UserService, private router: Router) { }
  isLecturer(): boolean {
    const currentUser = this.userService.getCurrentUser();
    return currentUser?.isLecturer === true;
  }


  isLoggedIn(): boolean {
    return this.userService.isLoggedIn();
  }

  logout() {
    this.userService.logout();
    this.router.navigate(['/login']);
  }
  ngOnInit() {
    this.userService.currentUser?.subscribe(user => {
      this.isLoggedIn = () => !!user;

    });


  }

}
