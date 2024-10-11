import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import EmployeeDTO from '../dtos/employee/employee.dto';
import EmployeeInsertDTO from '../dtos/employee/employeeInsert.dto';
import JobHistoryInsertDTO from '../dtos/jobHistory/jobHistoryInsert.dto';
import { start } from 'repl';

@Injectable({
  providedIn: 'root',
})
export class JobHistoryService {
  private apiJobHistory = `${environment.apiBaseUrl}/job_history`;
  private apiGetAllJobHistory = `${environment.apiBaseUrl}/job_history/all`;

  private apiConfig = {
    headers: this.createHeaders(),
  };

  constructor(private http: HttpClient) {}
  private createHeaders(): HttpHeaders {
    return new HttpHeaders({ 'Content-Type': 'application/json' });
  }

  getJobHistoryByEmployeeId(employeeId: number): Observable<any> {
    return this.http.get( `${this.apiJobHistory}/${employeeId}`);
  }

  getJobHistoryByEmployeeIdAndDate(employeeId: number, startDate: Date, endDate: Date): Observable<any> {
    return this.http.get( `${this.apiJobHistory}?employeeId=${employeeId}&startDate=${startDate}&endDate=${endDate}`);
  }

  getAllJobHistory(): Observable<any> {
    return this.http.get(this.apiGetAllJobHistory);
  }


  insertJobHistory(jobHistoryInsertDTO: JobHistoryInsertDTO): Observable<any> {
    return this.http.post(this.apiJobHistory, jobHistoryInsertDTO, this.apiConfig);
  }

  updateJobHistory(
    jobHistoryInsertDTO: JobHistoryInsertDTO
  ): Observable<any> {
    return this.http.put(
      `${this.apiJobHistory}?employeeId=${jobHistoryInsertDTO.employee_id}&startDate=${jobHistoryInsertDTO.start_date}`,
      jobHistoryInsertDTO,
      this.apiConfig
    );
  }

  deleteJobHistory(employeeId: number, startDate: Date): Observable<any> {
    return this.http.delete(
      `${this.apiJobHistory}?employeeId=${employeeId}&startDate=${startDate}`,
      this.apiConfig
    );
  }

}
