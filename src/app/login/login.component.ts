import { Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import LoginDTO from '../dtos/user/login.dto';
 
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  @ViewChild('loginForm') loginForm!: NgForm;

  username: string;
  password: string;

  constructor(private userService: UserService, private router: Router) {
    this.username = 'janedoe123';
    this.password = 'janedoe123';
  }

  loginHandler() {
    debugger
    const loginDTO:LoginDTO = {
      user_name: this.username,
      password: this.password
    };
    this.userService.login(loginDTO).subscribe({
      next: (response: any) => {
        this.router.navigate(['/']);
      },
      complete: () => {
      },
      error: (error: any) => {
        debugger
        alert(`Cannot login , error: ${error.error.message}`);
      },
    });
  }

}
