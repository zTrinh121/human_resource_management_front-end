import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee-detail',
  standalone: true,
  imports: [HeaderComponent, FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './employee-detail.component.html',
  styleUrl: './employee-detail.component.scss',
})
export class EmployeeDetailComponent implements OnInit {
  employeeDetailForm: FormGroup = new FormGroup({
    first_name: new FormControl('', Validators.required),
    last_name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone_number: new FormControl('', [
      Validators.required,
      Validators.pattern('[0-9 ]{10}'),
    ]),
    date_of_birth: new FormControl(),
    hire_date: new FormControl(Validators.required),
    manager_id: new FormControl(0, Validators.required),
    department_id: new FormControl(0, Validators.required),
    user_id: new FormControl(),
    job_id: new FormControl(0, Validators.required),
    salary: new FormControl(0, Validators.required),
  });
  formValue: any;
  isAdmin: boolean = false;

  departments: any[] = [];
  jobs: any[] = [];
  employee: any;
  id: number = 0;

  ngOnInit(): void {
    this.id = parseInt(this.route.snapshot.paramMap.get('id') as string);
    this.isAdmin = this.userService.getRoleName() === 'ADMIN' ? true : false;
    this.fetchDepartments();
    this.fetchJobs();
    this.getEmployeeById(this.id);
  }

  constructor(
    private employeeService: EmployeeService,
    private departmentService: DepartmentService,
    private jobService: JobService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private _location: Location,
    private toastr: ToastrService
  ) {}

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

  getEmployeeById(id: number) {
    this.employeeService.getEmployeeById(id).subscribe((data) => {
      this.employee = data.data;
      this.initializeForm();
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

  initializeForm() {
    this.employeeDetailForm.patchValue({
      first_name: this.employee.first_name,
      last_name: this.employee.last_name,
      email: this.employee.email,
      phone_number: this.employee.phone_number,
      date_of_birth: this.employee.date_of_birth,
      hire_date: this.employee.hire_date,
      manager_id: this.employee.manager_id,
      department_id: this.employee.department_id,
      user_id: this.employee.user_id,
      job_id: this.employee.job_id,
      salary: this.employee.salary,
    });
  }

  updateEmployee(employee: any): void {
    if (this.isAdmin) {
      this.employeeService.updateEmployee(this.id, employee).subscribe({
        next: (response: LoginResponse) => {
          // const { data } = response;
          this.showSuccess("Updated employee successfully");
          this.router.navigate(['/employees']);
        },
        complete: () => {},
        error: (error: any) => {
          console.log(error);
        },
      });
    }
  }

  deleteEmployee(): void {
    if (this.isAdmin) {
      this.employeeService.deleteEmployee(this.id).subscribe(
        (response) => {
          console.log('Delete successful', response);
          const modal = document.querySelector('.modal');
          if (modal) {
            modal.classList.remove('show');
            document.body.classList.remove('modal-open');
            const backdrop = document.querySelector('.modal-backdrop');
            if (backdrop) {
              backdrop.remove();
            }
          }
          this.showSuccess("Delete employee successfully");
          this.router.navigate(['/employees']);
        },
        (error) => {
          console.error('Error during delete', error); 
        }
      );
    }
  }

  backClicked() {
    this._location.back();
  }

  showSuccess(message: string) {
    this.toastr.success(message);
  }
}
