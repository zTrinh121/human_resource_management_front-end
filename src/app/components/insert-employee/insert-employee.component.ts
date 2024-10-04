import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { EmployeeService } from '../../services/employee.service';
import { DepartmentService } from '../../services/department.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { JobService } from '../../services/job.service';

@Component({
  selector: 'app-insert-employee',
  standalone: true,
  imports: [HeaderComponent, FormsModule, CommonModule],
  templateUrl: './insert-employee.component.html',
  styleUrl: './insert-employee.component.scss'
})
export class InsertEmployeeComponent implements OnInit {
  departments: any[] = [];
  jobs: any[] = [];

  ngOnInit(): void {
    this.fetchDepartments();
    this.fetchJobs();
  }

  constructor(
    private employeeService: EmployeeService,
    private departmentService: DepartmentService, 
    private jobService: JobService,
  ) {
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
}
