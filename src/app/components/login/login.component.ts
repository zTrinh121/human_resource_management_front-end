import { Component  } from '@angular/core';
import { FormControl, FormGroup, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators, ReactiveFormsModule} from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from '../../services/user.service';
import { TokenService } from '../../services/token.service';
import LoginDTO from '../../dtos/user/login.dto';
import { LoginResponse } from '../../responses/user/login.response';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent  {

  loginForm: FormGroup = new FormGroup({
    username : new FormControl("", Validators.required,),
    password: new FormControl("",[Validators.required, Validators.minLength(8)]),
  })
  formValue: any;

  constructor(
    private userService: UserService,
    private router: Router,
    private tokenService: TokenService,
    private formBuilder: FormBuilder
  ) {
  }

  loginHandler() {
    this.formValue = this.loginForm.value;
    const loginDTO: LoginDTO = {
      user_name: this.formValue.username,
      password: this.formValue.password,
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
