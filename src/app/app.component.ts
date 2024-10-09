import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { FooterComponent } from "./components/footer/footer.component";
import { HeaderComponent } from "./components/header/header.component";
import { DepartmentComponent } from './components/department/department.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, 
    FooterComponent, 
    HeaderComponent, 
    DepartmentComponent,
    NgxSpinnerModule,
    FontAwesomeModule 
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'hr_management_front_end';
}
