import { Injectable } from "@angular/core";
import { environment } from "../environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root', 
  })

  export class JobService{
    private apiGetAllJobs = `${environment.apiBaseUrl}/jobs/all`;
    private apiConfig = {
      headers: this.createHeaders(),
    }

    constructor(private http: HttpClient) {}
  private createHeaders():HttpHeaders{
    return new HttpHeaders({ 'Content-Type': 'application/json' });
  }

  getAllJobs(): Observable<any> {
    return this.http.get(this.apiGetAllJobs);
  }

  }