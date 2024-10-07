import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '../services/token.service';
import { inject } from '@angular/core';

export const AuthGuard: CanActivateFn = (route, state) => {
  const tokenService = inject(TokenService);
  const router = inject(Router);
  if(tokenService.getToken() !== null){
    return true;
  }else{
    router.navigate(['/login']);
    return false;
  }
  
};
