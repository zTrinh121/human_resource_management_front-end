import { Component } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { EmployeeService } from '../../services/employee.service';
import {NgxPaginationModule} from 'ngx-pagination'; 
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [FooterComponent, HeaderComponent, CommonModule, NgxPaginationModule],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.scss',
})
export class EmployeesComponent {
  employees: any[] = [];
  p: number = 1;
  itemsPerPage: number = 7

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.fetchEmployees();
  }

  fetchEmployees(): void {
    this.employeeService.getAllEmployees().subscribe(
      (data) => {
        this.employees = data.data;
      },
      (error) => {
        console.error('Error fetching employees', error);
      }
    );
  }
}
