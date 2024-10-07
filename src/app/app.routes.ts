import { Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { EmployeesComponent } from './components/employees/employees.component';
import { DepartmentComponent } from './components/department/department.component';
import { LoginComponent } from './components/login/login.component';
import { InsertEmployeeComponent } from './components/insert-employee/insert-employee.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { AuthGuard } from './guard/auth-guard.guard';
import { JobComponent } from './components/job/job.component';

export const routes: Routes = [
    {path: 'departments', component: DepartmentComponent, title: 'Departments', canActivate: [AuthGuard]},
    {path: 'employees', component: EmployeesComponent, title: 'Employees', canActivate: [AuthGuard]},
    {path: 'insert-employee', component: InsertEmployeeComponent, title: 'Insert Employee', canActivate: [AuthGuard]},
    {path: '', redirectTo: '/login', pathMatch: 'full'},
    {path: 'login', component: LoginComponent, title: 'Login'},
    {path: 'register', component: RegisterComponent, title: 'Register'},
    {path: 'jobs', component: JobComponent, title: 'Jobs', canActivate: [AuthGuard]},
    { path: '**', component: NotfoundComponent, title: 'Not found' },
    
];
