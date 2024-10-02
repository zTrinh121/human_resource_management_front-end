import { Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import LoginDTO from '../../dtos/user/login.dto';
import { TokenService } from '../../services/token.service';
import { LoginResponse } from '../../responses/user/login.response';
 
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

  constructor(private userService: UserService,
     private router: Router,
      private tokenService: TokenService) {
    this.username = 'janedoe123';
    this.password = 'janedoe123';
  }

  loginHandler() {
    const loginDTO:LoginDTO = {
      user_name: this.username,
      password: this.password
    };
    this.userService.login(loginDTO).subscribe({
      next: (response: LoginResponse) => {
        const {data} = response;
        this.tokenService.setToken(data);
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
