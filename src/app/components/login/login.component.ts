import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


@Component({
  standalone:true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [CommonModule, FormsModule, RouterModule],
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private userService: UserService, private router: Router) {}

  onSubmit() {
    this.userService.login(this.username, this.password).subscribe(
      success => { 
        console.log(success);
        if (success) {
          this.router.navigate(['/courses']);
        }
      },
      error => {
        if(error.status===401){
          alert("שם משתמש או סיסמא שגויים");
        }
        if(error.status===404) {
        alert("אינך רשום במערכת, הנך מועבר להרשמה");
          this.router.navigate(['/register'], { queryParams: { username: this.username } });
        }
      }
    );
  }
}

