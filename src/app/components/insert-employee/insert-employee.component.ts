import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule, Location } from '@angular/common';

import { HeaderComponent } from '../header/header.component';

import { EmployeeService } from '../../services/employee.service';
import { DepartmentService } from '../../services/department.service';
import { JobService } from '../../services/job.service';
import { UserService } from '../../services/user.service';

import { LoginResponse } from '../../responses/user/login.response';

import EmployeeInsertDTO from '../../dtos/employee/employeeInsert.dto';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-insert-employee',
  standalone: true,
  imports: [HeaderComponent, FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './insert-employee.component.html',
  styleUrl: './insert-employee.component.scss',
})
export class InsertEmployeeComponent implements OnInit {
  insertEmployeeForm: FormGroup = new FormGroup({
    firstName: new FormControl('Rock', Validators.required),
    lastName: new FormControl('Doe', Validators.required),
    email: new FormControl('rockdoe@gmail.com', [
      Validators.required,
      Validators.email,
    ]),
    phoneNumber: new FormControl('0928918322', [
      Validators.required,
      Validators.pattern('[0-9 ]{10}'),
    ]),
    dateOfBirth: new FormControl(),
    hireDate: new FormControl("" ,Validators.required),
    managerId: new FormControl(1, Validators.required),
    departmentId: new FormControl(1, Validators.required),
    userId: new FormControl(),
    jobId: new FormControl(1, Validators.required),
    salary: new FormControl(10000, Validators.required),
  });
  formValue: any;
  isAdmin: boolean = false;

  departments: any[] = [];
  jobs: any[] = [];

  ngOnInit(): void {
    
  }

  constructor(
    private employeeService: EmployeeService,
    private departmentService: DepartmentService,
    private jobService: JobService,
    private router: Router,
    private useService: UserService,
    private toastr: ToastrService,
    private _location: Location,

  ) {
    this.naviagateRole();
    this.fetchDepartments();
    this.fetchJobs();

  }

  fetchDepartments(): void {
    this.departmentService.getAllDepartments().subscribe({
      next: (data) => {
        this.departments = data.data;
      },
      error: (error) => {
        console.error('Error fetching departments', error);
      },
    });
  }

  fetchJobs(): void {
    this.jobService.getAllJobs().subscribe({
      next: (data) => {
        this.jobs = data.data;
      },
      error: (error) => {
        console.error('Error fetching jobs', error);
      },
    });
  }

  insertEmployee() {
    this.formValue = this.insertEmployeeForm.value;

    const employeeDTO: EmployeeInsertDTO = {
      first_name: this.formValue.firstName,
      last_name: this.formValue.lastName,
      email: this.formValue.email,
      phone_number: this.formValue.phoneNumber,
      date_of_birth: this.formValue.dateOfBirth,
      hire_date: this.formValue.hireDate,
      manager_id: this.formValue.managerId,
      department_id: this.formValue.departmentId,
      user_id: this.formValue.userId,
      job_id: this.formValue.jobId,
      salary: this.formValue.salary,
    };

    this.employeeService.insertEmployees(employeeDTO).subscribe({
      next: (response: LoginResponse) => {
        const { data } = response;
        this.router.navigate(['/employees']);
      },
      complete: () => {},
      // error: (error: any) => {
      //   console.log(error);
      // },
    });
  }

  naviagateRole(){
    const role = this.useService.getRoleName();
    if(role === "USER"){
      this.toastr.error("You cannot access");
      this.router.navigate(['/employees']);
    }
  }

  backClicked() {
    this._location.back();
  }
}
