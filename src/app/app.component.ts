import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from "./components/footer/footer.component";
import { HeaderComponent } from "./components/header/header.component";
import { DepartmentComponent } from './components/department/department.component';
import { NgxLoadingModule } from "@dchtools/ngx-loading-v18";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, 
    FooterComponent, 
    HeaderComponent, 
    DepartmentComponent,
    NgxLoadingModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'hr_management_front_end';
}
