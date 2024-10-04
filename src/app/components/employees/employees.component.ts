import { Component, OnInit } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { EmployeeService } from '../../services/employee.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { CommonModule } from '@angular/common';
import { DepartmentService } from '../../services/department.service';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [
    FooterComponent,
    HeaderComponent,
    CommonModule,
    NgxPaginationModule,
    FormsModule,
  ],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.scss',
})
export class EmployeesComponent implements OnInit {

  employees: any[] = [];
  departments: any[] = [];
  p: number = 1;
  itemsPerPage: number = 7;
  keyword: string = '';
  selectedDeparment: string = ''
  filteredEmployees: any[] = [];
  loading = false;
  roleName: string | null = '';

  constructor(
    private employeeService: EmployeeService,
    private departmentService: DepartmentService,
    private userService: UserService,
  ) {
    this.keyword = '';
  }

  ngOnInit(): void {
    this.fetchEmployees();
    this.fetchDepartments();
    this.roleName = this.userService.getRoleName();
  }

  fetchEmployees(): void {
    this.loading = true;
    this.employeeService.getAllEmployees().subscribe({
      next: (data) => {
        this.employees = data.data;
      },
      error: (error) => {
        console.error('Error fetching employees', error);
      },
    });
    
  }

  fetchDepartments(): void {
    this.departmentService.getAllDepartments().subscribe({
      next: (data) => {
        this.departments = data.data;
      },
      error: (error) => {
        console.error('Error fetching departments', error);
      },
    });
  }

  onSearch(){
    const params = {
      keyword: this.keyword || '',
      departmentName: this.selectedDeparment || ''
    }
    this.employeeService.searchEmployees(params.keyword, params.departmentName).subscribe({
      next: (data) => {
        this.p = 1;
        this.employees = data.data;
      },
      error: (error) => {
        console.error('Error fetching employees', error);
      },
    });
  }
}
