import { Component } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { JobService } from '../../services/job.service';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../services/user.service';
import { map, Observable } from 'rxjs';
import JobInsertDTO from '../../dtos/job/jobInsert.dto';

@Component({
  selector: 'app-job',
  standalone: true,
  imports: [
    FooterComponent,
    HeaderComponent,
    CommonModule,
    FormsModule,
    NgxPaginationModule,
    ReactiveFormsModule,
  ],
  templateUrl: './job.component.html',
  styleUrl: './job.component.scss',
})
export class JobComponent {
  jobs: any[] = [];
  job: any = null;
  jobId: number = 0;
  formValue: any;
  isAdmin: boolean = false;

  p: number = 1;
  itemsPerPage: number = 6;

  constructor(
    private jobService: JobService,
    private userService: UserService,
    private toastr: ToastrService
  ) {
    this.fetchJobs();
    this.isAdmin = this.userService.getRoleName() === 'ADMIN' ? true : false;
  }

  getJob(jobId: number): Observable<any> {
    return this.jobService.getJobById(jobId).pipe(
      map((response) => {
        this.job = response.data;
      })
    );
  }

  updateJobForm: FormGroup = new FormGroup({
    job_title: new FormControl('', Validators.required),
  });

  insertJobForm: FormGroup = new FormGroup({
    job_title: new FormControl('', Validators.required),
  });

  insertJob() {
    this.formValue = this.insertJobForm.value;

    const jobDTO: JobInsertDTO = {
      job_title: this.formValue.job_title,
    };

    this.jobService.insertJob(jobDTO).subscribe((response) => {
      const modalInsert = document.getElementById('insertModal');
      if (modalInsert) {
        modalInsert.classList.remove('show');
        document.body.classList.remove('modal-open');
        const backdrop = document.querySelector('.modal-backdrop');
        if (backdrop) {
          backdrop.remove();
        }
      }
      this.toastr.success('Insert new job successfully');
      this.fetchJobs();
    });
  }

  updateJob(job: any, jobId: number) {
    this.jobService.updateJob(job, jobId).subscribe(() => {
      const modalEdit = document.getElementById('editModal');
      if (modalEdit) {
        modalEdit.classList.remove('show');
        document.body.classList.remove('modal-open');
        const backdrop = document.querySelector('.modal-backdrop');
        if (backdrop) {
          backdrop.remove();
        }
      }
      this.toastr.success('Job updated successfully');
      this.fetchJobs();
    });
  }

  deleteJob(jobId: number) {
    this.jobService.deleteJob(jobId).subscribe(() => {
      const modalDelete = document.getElementById('deleteModal');
      if (modalDelete) {
        modalDelete.classList.remove('show');
        document.body.classList.remove('modal-open');
        const backdrop = document.querySelector('.modal-backdrop');
        if (backdrop) {
          backdrop.remove();
        }
      }
      this.toastr.success('Job is deleted successfully');
      this.fetchJobs();
    });
  }

  handleUpdateJob(jobId: number): void {
    this.getJob(jobId).subscribe(() => {
      this.jobId = jobId;
      this.initializeForm();
    });
  }

  handleDeleteJob(jobId: number): void {
    this.getJob(jobId).subscribe(() => {
      this.jobId = jobId;
    });
  }

  initializeForm() {
    this.updateJobForm.patchValue({
      job_title: this.job?.job_title,
    });
  }

  fetchJobs(): void {
    this.jobService.getAllJobs().subscribe({
      next: (data) => {
        this.jobs = data.data;
      },
    });
  }
}
