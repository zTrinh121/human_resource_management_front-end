import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../services/user.service';
import { JobHistoryService } from '../../services/jobHistory.service';

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
  isAdmin: boolean = false;

  p: number = 1;
  itemsPerPage: number = 6;

  constructor(
    private jobHistoryService: JobHistoryService,
    private userService: UserService,
    private toastr: ToastrService
  ) {
    this.fetchJobHistory();
    this.isAdmin = this.userService.getRoleName() === 'ADMIN' ? true : false;
  }

  getJobHistoryByEmployeeId(employeeId: number): void {
    this.jobHistoryService.getJobHistoryByEmployeeId(employeeId).subscribe((response) => {
      this.jobHistory = response.data;
    });
  }

  jobHistoryForm: FormGroup = new FormGroup({
    employee_id: new FormControl('', Validators.required),
    job_id: new FormControl(0, Validators.required),
    department_id: new FormControl(0, Validators.required),
    start_date: new FormControl(Validators.required),
    end_date: new FormControl(Validators.required),
  })

  fetchJobHistory(): void {
    this.jobHistoryService.getAllJobHistory().subscribe((response) => {
      this.jobHistories = response.data;
    });
  }
}
