import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { TokenService } from '../../services/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  
  constructor(private userService: UserService, 
    private tokenSerice: TokenService,
    private router: Router,
  ){
  }

  userName: string | null = '';
  ngOnInit(): void {
    this.userName = this.userService.getUserName();
  }

  onLogOut(): void{
    this.userService.removeRoleName();
    this.userService.removeUserName();
    this.tokenSerice.removeToken();
    this.router.navigate(['/login']);
  }



}
