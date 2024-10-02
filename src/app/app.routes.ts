import { Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { JobComponent } from './job/job.component';
import { EmployeesComponent } from './components/employees/employees.component';
import { DepartmentComponent } from './components/department/department.component';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
    {path: 'departments', component: DepartmentComponent},
    {path: '', component: EmployeesComponent},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'jobs', component: JobComponent},
];
