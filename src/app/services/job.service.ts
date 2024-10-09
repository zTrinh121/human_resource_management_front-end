import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import JobInsertDTO from '../dtos/job/jobInsert.dto';

@Injectable({
  providedIn: 'root',
})
export class JobService {
  private apiJob = `${environment.apiBaseUrl}/jobs`;
  private apiGetAllJobs = `${environment.apiBaseUrl}/jobs/all`;
  private apiConfig = {
    headers: this.createHeaders(),
  };

  constructor(private http: HttpClient) {}
  private createHeaders(): HttpHeaders {
    return new HttpHeaders({ 'Content-Type': 'application/json' });
  }

  getAllJobs(): Observable<any> {
    return this.http.get(this.apiGetAllJobs);
  }

  getJobById(jobId: number): Observable<any> {
    return this.http.get(`${this.apiJob}/${jobId}`);
  }

  insertJob(jobDTO: JobInsertDTO): Observable<any> {
    return this.http.post(this.apiJob, jobDTO, this.apiConfig);
  }

  updateJob(jobDTO: JobInsertDTO, jobId: number): Observable<any> {
    return this.http.put(`${this.apiJob}/${jobId}`, jobDTO, this.apiConfig);
  }

  deleteJob( jobId: number): Observable<any> {
    return this.http.delete(`${this.apiJob}/${jobId}`, this.apiConfig);
  }
}
