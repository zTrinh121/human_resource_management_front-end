import { Component, OnInit, ViewChild } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { EmployeeService } from '../../services/employee.service';
import { DepartmentService } from '../../services/department.service';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { JobService } from '../../services/job.service';
import EmployeeInsertDTO from '../../dtos/employeeInsert.dto';
import { LoginResponse } from '../../responses/user/login.response';
import { Router } from '@angular/router';

@Component({
  selector: 'app-insert-employee',
  standalone: true,
  imports: [HeaderComponent, FormsModule, CommonModule],
  templateUrl: './insert-employee.component.html',
  styleUrl: './insert-employee.component.scss'
})
export class InsertEmployeeComponent implements OnInit {
  @ViewChild('insertEmployeeForm') loginForm!: NgForm;

  departments: any[] = [];
  jobs: any[] = [];
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: Date;
  hireDate: Date;
  managerId: number;
  departmentId: number;
  userId: number;
  jobId: number;
  salary: number;

  ngOnInit(): void {
    this.fetchDepartments();
    this.fetchJobs();
  }

  constructor(
    private employeeService: EmployeeService,
    private departmentService: DepartmentService, 
    private jobService: JobService,
    private router: Router
  ) {
    this.firstName = '';
    this.lastName = '';
    this.email = '';
    this.phoneNumber = '';
    this.dateOfBirth = new Date();
    this.hireDate = new Date();
    this.managerId = 0;
    this.departmentId = 0;
    this.userId = 0;
    this.jobId = 0;
    this.salary = 0;
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

  insertEmployee(insertEmployeeForm: NgForm){
    if(insertEmployeeForm.invalid){
      insertEmployeeForm.form.markAllAsTouched(); 
      return
    }

    const employeeDTO : EmployeeInsertDTO = {
      first_name: this.firstName,
      last_name: this.lastName,
      email: this.email,
      phone_number: this.phoneNumber,
      date_of_birth: this.dateOfBirth,
      hire_date: this.hireDate,
      manager_id: this.managerId,
      department_id: this.departmentId,
      user_id: this.userId,
      job_id: this.jobId,
      salary: this.salary
    }
    
    // this.employeeService.insertEmployees(employeeDTO).subscribe({
    //   next: (response: LoginResponse) => {
    //     const { data } = response;
    //     this.router.navigate(['/employees']);
    //   },
    //   complete: () => {},
    //   error: (error: any) => {
    //     console.log(error);
    //   },
    // });
  }
}
