import { Component } from '@angular/core';
import { FooterComponent } from "../components/footer/footer.component";
import { HeaderComponent } from "../components/header/header.component";

@Component({
  selector: 'app-job',
  standalone: true,
  imports: [FooterComponent, HeaderComponent],
  templateUrl: './job.component.html',
  styleUrl: './job.component.scss'
})
export class JobComponent {

}
