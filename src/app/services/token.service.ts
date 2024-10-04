import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root', 
  })
export class TokenService{
    private readonly TOKEN_KEY = 'access_token';
    constructor(){
    }

    getToken():string | null {
        if(typeof window !== 'undefined'){
            return localStorage.getItem('access_token');
        }
        return null;
    }
    setToken(token: string): void{
        localStorage.setItem(this.TOKEN_KEY, token);
    }

    removeToken(): void{
        localStorage.removeItem(this.TOKEN_KEY);
    }
}