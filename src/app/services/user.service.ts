import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegisterDTO } from '../dtos/register.dto';

@Injectable({
  providedIn: 'root', // This provides the service at the root level
})
export class UserService {
  private apiUrl = 'http://localhost:8080/api/v1/users/register';

  constructor(private http: HttpClient) {}

  register(registerDTO: RegisterDTO): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.apiUrl, registerDTO, { headers });
  }
}
