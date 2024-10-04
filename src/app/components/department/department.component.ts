import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { DepartmentService } from '../../services/department.service';


@Component({
  selector: 'app-department',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './department.component.html',
  styleUrl: './department.component.scss'
})
export class DepartmentComponent {
  constructor(private departmentService: DepartmentService){}

  
}
