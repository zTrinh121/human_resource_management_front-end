import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegisterDTO } from '../dtos/user/register.dto';
import LoginDTO from './../dtos/user/login.dto';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiRegister = `${environment.apiBaseUrl}/users/register`;
  private apiLogin = `${environment.apiBaseUrl}/users/login`;
  private apiConfig = {
    headers: this.createHeaders(),
  };
  private readonly USER_NAME = 'user_name';
  private readonly ROLE_NAME = 'role_name';
  constructor(private http: HttpClient) {}
  private createHeaders(): HttpHeaders {
    return new HttpHeaders({ 'Content-Type': 'application/json' });
  }

  getUserName(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(this.USER_NAME);
    }
    return null;
  }
  setUserName(userName: string): void {
    localStorage.setItem(this.USER_NAME, userName);
  }

  removeUserName(): void {
    localStorage.removeItem(this.USER_NAME);
  }

  getRoleName(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(this.ROLE_NAME);
    }
    return null;
  }
  setRoleName(roleName: string): void {
    localStorage.setItem(this.ROLE_NAME, roleName);
  }

  removeRoleName(): void {
    localStorage.removeItem(this.ROLE_NAME);
  }

  register(registerDTO: RegisterDTO): Observable<any> {
    return this.http.post(this.apiRegister, registerDTO, this.apiConfig);
  }

  login(loginDTO: LoginDTO): Observable<any> {
    return this.http.post(this.apiLogin, loginDTO, this.apiConfig);
  }
}
