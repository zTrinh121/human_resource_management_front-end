import { Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { RegisterDTO } from '../dtos/user/register.dto';

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
    this.username = 'johndoe';
    this.email = 'johndoe@gmail.com';
    this.password = 'johndoe123';
    this.confirmPassword = 'johndoe123';
    this.dateOfBirth = new Date();
    this.dateOfBirth.setFullYear(this.dateOfBirth.getFullYear() - 18);
  }

  registerHandler() {
    console.log("Goes into register");
    debugger
    const registerDTO:RegisterDTO = {
      user_name: this.username,
      email: this.email,
      password: this.password,
      role_id: 2,
    };
    this.userService.register(registerDTO).subscribe({
      next: (response: any) => {
        this.router.navigate(['/login']);
      },
      complete: () => {
      },
      error: (error: any) => {
        debugger
        alert(`Cannot register, error: ${error.message}`);
      },
    });
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
