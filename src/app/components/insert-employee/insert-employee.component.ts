import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";

@Component({
  selector: 'app-insert-employee',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './insert-employee.component.html',
  styleUrl: './insert-employee.component.scss'
})
export class InsertEmployeeComponent {

}
