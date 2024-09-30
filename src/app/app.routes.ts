import { Routes } from '@angular/router';
import { DepartmentComponent } from './department/department.component';
import { LoginComponent } from './login/login.component';
import { EmployeesComponent } from './employees/employees.component';
import { RegisterComponent } from './register/register.component';

export const routes: Routes = [
    {path: 'departments', component: DepartmentComponent},
    {path: '', component: EmployeesComponent},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
];
