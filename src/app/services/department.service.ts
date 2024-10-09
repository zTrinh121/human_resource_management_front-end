import { Injectable } from "@angular/core";
import { environment } from "../environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import DepartmentInsertDTO from "../dtos/department/departmentInsert.dto";

@Injectable({
    providedIn: 'root', 
  })

  export class DepartmentService{
    private apiDepartments = `${environment.apiBaseUrl}/departments`;
    private apiGetAllDepartments = `${environment.apiBaseUrl}/departments/all`;
    private apiSearchDepartments = `${environment.apiBaseUrl}/departments/search`;
    private apiConfig = {
      headers: this.createHeaders(),
    }

    constructor(private http: HttpClient) {}
  private createHeaders():HttpHeaders{
    return new HttpHeaders({ 'Content-Type': 'application/json' });
  }

  getAllDepartments(): Observable<any> {
    return this.http.get(this.apiGetAllDepartments);
  }

  getDepartmentById(departmentId: number): Observable<any> {
    return this.http.get(`${this.apiDepartments}/${departmentId}`);
  }

  searchDepartments(keyword: string): Observable<any> {
    return this.http.get(
      `${this.apiSearchDepartments}?keyword=${keyword}`
    );
  }

  insertDepartment(departmentDTO: DepartmentInsertDTO): Observable<any> {
    return this.http.post(this.apiDepartments, departmentDTO, this.apiConfig);
  }

  updateDepartment(departmentDTO: DepartmentInsertDTO, departmentId: number): Observable<any> {
    return this.http.put(`${this.apiDepartments}/${departmentId}`, departmentDTO, this.apiConfig);
  }

  deleteDepartment(departmentId: number): Observable<any> {
    return this.http.delete(`${this.apiDepartments}/${departmentId}`, this.apiConfig);
  }

  }