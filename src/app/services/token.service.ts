import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root', 
  })
export class TokenService{
    private readonly TOKEN_KEY = 'access_token';
    constructor(){
    }

    getToken():string | null {
        // console.log("GetToken:" + localStorage.getItem('access_token'));
        // return localStorage.getItem(this.TOKEN_KEY);
        debugger
        if(typeof window !== 'undefined'){
            console.log("GetToken");
            return localStorage.getItem('access_token');
        }
        console.log("Cannot get token from token service");
        return null;
    }
    setToken(token: string): void{
        console.log("SetToken:" + localStorage.getItem('access_token'));
        localStorage.setItem(this.TOKEN_KEY, token);
    }

    removeToken(): void{
        localStorage.removeItem(this.TOKEN_KEY);
    }
}