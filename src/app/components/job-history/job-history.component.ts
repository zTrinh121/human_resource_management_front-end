import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { ToastrService } from 'ngx-toastr';

import { HeaderComponent } from '../header/header.component';

import { EmployeeService } from '../../services/employee.service';
import { UserService } from '../../services/user.service';
import { JobHistoryService } from '../../services/jobHistory.service';

import JobHistoryInsertDTO from '../../dtos/jobHistory/jobHistoryInsert.dto';
import { JobService } from '../../services/job.service';
import { DepartmentService } from '../../services/department.service';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-job-history',
  standalone: true,
  imports: [
    HeaderComponent,
    CommonModule,
    FormsModule,
    NgxPaginationModule,
    ReactiveFormsModule,
  ],
  templateUrl: './job-history.component.html',
  styleUrl: './job-history.component.scss',
})
export class JobHistoryComponent {
  jobHistories: any[] = [];
  jobHistory: any = null;
  employeeId: number = 0;
  startDate: Date = new Date();
  endDate: Date = new Date();
  isAdmin: boolean = false;
  employees: any[] = [];
  departments: any[] = [];
  jobs: any[] = [];
  formValue: any;
  p: number = 1;
  itemsPerPage: number = 6;

  constructor(
    private jobHistoryService: JobHistoryService,
    private userService: UserService,
    private jobService: JobService,
    private departmentService: DepartmentService,
    private employeeService: EmployeeService,
    private toastr: ToastrService
  ) {
    this.fetchJobHistory();
    this.fetchEmployees();
    this.fetchJobs();
    this.fetchDepartments();
    this.isAdmin = this.userService.getRoleName() === 'ADMIN' ? true : false;
  }

  jobHistoryInsertForm: FormGroup = new FormGroup({
    employee_id: new FormControl('', Validators.required),
    job_id: new FormControl('', Validators.required),
    department_id: new FormControl('', Validators.required),
    start_date: new FormControl('', Validators.required),
    end_date: new FormControl('', Validators.required),
  });

  resetFormInsert() {
    this.jobHistoryUpdateForm.patchValue({
      employee_id: '',
      start_date: '',
      end_date: '',
      job_id: '',
      department_id: '',
    });
  }

  jobHistoryUpdateForm: FormGroup = new FormGroup({
    employee_id: new FormControl('', Validators.required),
    job_id: new FormControl('', Validators.required),
    department_id: new FormControl('', Validators.required),
    start_date: new FormControl('',Validators.required),
    end_date: new FormControl('',Validators.required),
  });

  getJobHistoryByEmployeeId(employeeId: number): void {
    this.jobHistoryService
      .getJobHistoryByEmployeeId(employeeId)
      .subscribe((response) => {
        this.jobHistory = response.data;
      });
  }

  getJobHistoryByEmployeeIdAndDate(
    employeeId: number,
    startDate: Date,
    endDate: Date
  ): Observable<any> {
    return this.jobHistoryService
      .getJobHistoryByEmployeeIdAndDate(employeeId, startDate, endDate)
      .pipe(
        map((response) => {
          this.jobHistory = response.data;
        })
      );
  }

  insertJobHistory() {
    this.formValue = this.jobHistoryInsertForm.value;
    const jobHistory: JobHistoryInsertDTO = {
      employee_id: this.formValue.employee_id,
      start_date: this.formValue.start_date,
      end_date: this.formValue.end_date,
      job_id: this.formValue.job_id,
      department_id: this.formValue.department_id,
    };

    this.jobHistoryService
      .insertJobHistory(jobHistory)
      .subscribe((response) => {
        const modalInsert = document.getElementById('insertModal');
        if (modalInsert) {
          modalInsert.classList.remove('show');
          document.body.classList.remove('modal-open');
          const backdrop = document.querySelector('.modal-backdrop');
          if (backdrop) {
            backdrop.remove();
          }
        }
        this.toastr.success('Insert new job history successfully');
        this.resetFormInsert();
        this.fetchJobHistory();
      });
  }

  updateJobHistory(jobHistoryInsertDTO: JobHistoryInsertDTO) {
    this.jobHistoryService
      .updateJobHistory(jobHistoryInsertDTO)
      .subscribe((response) => {
        const modalEdit = document.getElementById('editModal');
        if (modalEdit) {
          modalEdit.classList.remove('show');
          document.body.classList.remove('modal-open');
          const backdrop = document.querySelector('.modal-backdrop');
          if (backdrop) {
            backdrop.remove();
          }
        }
        this.toastr.success('Update job history successfully');
        this.fetchJobHistory();
      });
  }

  deleteJobHistory(employeeId: number, startDate: Date) {
    this.jobHistoryService
      .deleteJobHistory(employeeId, startDate)
      .subscribe((response) => {
        const modalDelete = document.getElementById('deleteModal');
        if (modalDelete) {
          modalDelete.classList.remove('show');
          document.body.classList.remove('modal-open');
          const backdrop = document.querySelector('.modal-backdrop');
          if (backdrop) {
            backdrop.remove();
          }
        }
        this.toastr.success('Delete job history successfully');
        this.fetchJobHistory();
      });
  }

  handleUpdateJobHistory(employeeId: number, startDate: Date, endDate: Date) {
    this.getJobHistoryByEmployeeIdAndDate(
      employeeId,
      startDate,
      endDate
    ).subscribe(() => {
      this.employeeId = employeeId;
      this.startDate = startDate;
      this.endDate = endDate;

      this.initializeForm();
    });
  }

  handleDeleteJobHistory(employeeId: number, startDate: Date, endDate: Date) {
    this.getJobHistoryByEmployeeIdAndDate(
      employeeId,
      startDate,
      endDate
    ).subscribe(() => {
      this.employeeId = employeeId;
      this.startDate = startDate;
      this.endDate = endDate;
    });
  }

  handleDeleteForm(employeeId: number, startDate: Date) {
    this.employeeId = employeeId;
    this.startDate = startDate;
  }

  initializeForm() {
    this.jobHistoryUpdateForm.patchValue({
      employee_id: this.jobHistory.employee_id,
      start_date: this.jobHistory.start_date,
      end_date: this.jobHistory.end_date,
      job_id: this.jobHistory.job_id,
      department_id: this.jobHistory.department_id,
    });
  }

  fetchJobHistory(): void {
    this.jobHistoryService.getAllJobHistory().subscribe((response) => {
      this.jobHistories = response.data;
    });
  }

  fetchEmployees(): void {
    this.employeeService.getAllEmployees().subscribe({
      next: (data) => {
        this.employees = data.data;
      },
    });
  }

  fetchJobs(): void {
    this.jobService.getAllJobs().subscribe({
      next: (data) => {
        this.jobs = data.data;
      },
    });
  }

  fetchDepartments(): void {
    this.departmentService.getAllDepartments().subscribe({
      next: (data) => {
        this.departments = data.data;
      },
    });
  }
}
