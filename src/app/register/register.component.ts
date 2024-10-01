import { Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  @ViewChild('registerForm') registerForm!: NgForm;

  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  dateOfBirth: Date;

  constructor(private userService: UserService, private router: Router) {
    this.username = 'jasonmick';
    this.email = '';
    this.password = 'jasonmick123';
    this.confirmPassword = '';
    this.dateOfBirth = new Date();
    this.dateOfBirth.setFullYear(this.dateOfBirth.getFullYear() - 18);
  }

  registerHandler() {
    console.log('Come into register successfull');
    debugger;
    // const apiUrl = 'http://localhost:8080/api/v1/users/register';
    const registerDTO = {
      user_name: this.username,
      password: this.password,
      role_id: 0,
    };
    // const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.userService.register(registerDTO).subscribe({
      next: (response: any) => {
        debugger;
        this.router.navigate(['/login']);
      },
      complete: () => {
        debugger;
      },
      error: (error: any) => {
        alert(`Cannot register, error: ${error.error.message}`);
      },
    });
    // this.http.post(apiUrl, registerData, { headers }).subscribe({
    //   next: (response: any) => {
    //     debugger;
    //     this.router.navigate(['/login']);
    //   },
    //   complete: () => {
    //     debugger;
    //   },
    //   error: (error: any) => {
    //     alert(`Cannot register, error: ${error.error.message}`);
    //   },
    // });
  }

  checkPasswordMatch() {
    if (this.password != this.confirmPassword) {
      this.registerForm.form.controls['confirmPassword'].setErrors({
        passwordMissMatch: true,
      });
    } else {
      this.registerForm.form.controls['confirmPassword'].setErrors(null);
    }
  }

  checkAge() {
    if (this.dateOfBirth) {
      const today = new Date();
      const birthDate = new Date(this.dateOfBirth);
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < birthDate.getDate())
      ) {
        age--;
      }

      if (age < 18) {
        this.registerForm.form.controls['dateOfBirth'].setErrors({
          ageLessThan18: true,
        });
      } else {
        this.registerForm.form.controls['dateOfBirth'].setErrors(null);
      }
    }
  }
}
