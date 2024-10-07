import { Component, ViewChild, OnInit  } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgForm, FormBuilder, Validators } from '@angular/forms';
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
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit  {
  @ViewChild('loginForm') loginForm!: NgForm;

  username: string;
  password: string;

  ngOnInit() {
   
  }

  constructor(
    private userService: UserService,
    private router: Router,
    private tokenService: TokenService,
    private formBuilder: FormBuilder
  ) {
    this.username = '';
    this.password = '';
  }

  loginHandler() {
    const loginDTO: LoginDTO = {
      user_name: this.username,
      password: this.password,
    };
    this.userService.login(loginDTO).subscribe({
      next: (response: LoginResponse) => {
        const { data } = response;
        this.tokenService.setToken(data.token);
        this.userService.setUserName(data.user_name);
        this.userService.setRoleName(data.role_name);
        this.router.navigate(['/employees']);
      },
      complete: () => {},
      error: (error: any) => {
        console.log(error);
      },
    });
  }
}
