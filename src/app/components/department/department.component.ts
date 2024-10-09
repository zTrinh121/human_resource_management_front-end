import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { DepartmentService } from '../../services/department.service';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../../services/employee.service';
import { UserService } from '../../services/user.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { Router } from '@angular/router';
import DepartmentInsertDTO from '../../dtos/department/departmentInsert.dto';
import { LoginResponse } from '../../responses/user/login.response';
import { ToastrService } from 'ngx-toastr';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-department',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    CommonModule,
    FormsModule,
    NgxPaginationModule,
    ReactiveFormsModule,
  ],
  templateUrl: './department.component.html',
  styleUrl: './department.component.scss',
})
export class DepartmentComponent implements OnInit {
  departments: any[] = [];
  employees: any[] = [];
  filteredEmployees: any[] = [];
  keyword: string = '';
  filterDepartments: any[] = [];
  p: number = 1;
  itemsPerPage: number = 5;
  selectedManager: string = '';
  formValue: any;
  department: any = null;
  isAdmin: boolean = false;
  departmentId: number = 0;

  constructor(
    private departmentService: DepartmentService,
    private employeeService: EmployeeService,
    private userService: UserService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.fetchEmployees();
    this.fetchDepartments();
    this.isAdmin = this.userService.getRoleName() === 'ADMIN' ? true : false;
  }

  getDepartment(id: number): Observable<any> {
    return this.departmentService.getDepartmentById(id).pipe(
      map((response) => {
        this.department = response.data;
      })
    );
  }

  updateDepartmentForm: FormGroup = new FormGroup({
    department_name: new FormControl('', Validators.required),
    manager_id: new FormControl(1, Validators.required),
  });

  updateDepartment(department: any, departmentId: number) {
    this.departmentService
      .updateDepartment(department, departmentId)
      .subscribe((response) => {
        const modalEdit = document.getElementById('editModal');
        if (modalEdit) {
          modalEdit.classList.remove('show');
          document.body.classList.remove('modal-open');
          const backdrop = document.querySelector('.modal-backdrop');
          if (backdrop) {
            backdrop.remove();
          }
        }
        this.showSuccess('Insert new department successfully');

      });
  }

  handleUpdateForm(departmentId: number): void {
    this.getDepartment(departmentId).subscribe(() => {
      // Filter out the manager from the employees list
      this.departmentId = departmentId;
      this.filteredEmployees = this.employees.filter(
        (employee) => employee.employee_id !== this.department.manager_id
      );
      this.initializeForm();
    });
  }
  initializeForm() {
    this.updateDepartmentForm.patchValue({
      department_name: this.department.department_name,
      manager_id: this.department.manager_id,
    });
  }

  insertDepartmentForm: FormGroup = new FormGroup({
    department_name: new FormControl('', Validators.required),
    manager_id: new FormControl(1, Validators.required),
  });

  insertDepartment() {
    this.formValue = this.insertDepartmentForm.value;

    const departmentDTO: DepartmentInsertDTO = {
      department_name: this.formValue.department_name,
      manager_id: this.formValue.manager_id,
    };

    this.departmentService
      .insertDepartment(departmentDTO)
      .subscribe((response) => {
        const modalInsert = document.getElementById('insertModal');
        if (modalInsert) {
          modalInsert.classList.remove('show');
          document.body.classList.remove('modal-open');
          const backdrop = document.querySelector('.modal-backdrop');
          if (backdrop) {
            backdrop.remove();
          }
        }
        this.showSuccess('Insert new department successfully');
      });
  }

  showSuccess(message: string) {
    this.toastr.success(message);
  }

  fetchDepartments(): void {
    this.departmentService.getAllDepartments().subscribe({
      next: (data) => {
        this.departments = data.data;
      },
    });
  }

  fetchEmployees(): void {
    this.employeeService.getAllEmployees().subscribe({
      next: (data) => {
        this.employees = data.data;
      },
    });
  }

  onSearch() {
    this.departmentService.searchDepartments(this.keyword).subscribe({
      next: (data) => {
        this.p = 1;
        this.departments = data.data;
      },
    });
  }
}
