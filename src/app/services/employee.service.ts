import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import EmployeeDTO from '../dtos/employee.dto';
import EmployeeInsertDTO from '../dtos/employeeInsert.dto';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private apiGetAllEmployees = `${environment.apiBaseUrl}/employees/all`;
  private apiSearchEmployees = `${environment.apiBaseUrl}/employees/search`;
  private apiInsertEmployees = `${environment.apiBaseUrl}/employees/search`;
  private apiConfig = {
    headers: this.createHeaders(),
  };

  constructor(private http: HttpClient) {}
  private createHeaders(): HttpHeaders {
    return new HttpHeaders({ 'Content-Type': 'application/json' });
  }

  getAllEmployees(): Observable<any> {
    return this.http.get(this.apiGetAllEmployees);
  }

  searchEmployees(keyword: string, departmentName: string): Observable<any> {
    return this.http.get(
      `${this.apiSearchEmployees}?keyword=${keyword}&departmentName=${departmentName}`
    );
  }

  insertEmployees(employeeDTO: EmployeeInsertDTO): Observable<any> {
    return this.http.post(this.apiInsertEmployees, employeeDTO, this.apiConfig);
  }
}
