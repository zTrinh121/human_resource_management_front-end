import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { TokenService } from "../services/token.service";

@Injectable()
export class TokenIntercaptor implements HttpInterceptor{
    constructor(private tokenService: TokenService) {}

    intercept(req: HttpRequest<any>, 
        next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.tokenService.getToken(); 
    
        if (token) {
          req = req.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`,
            },
          });
          return next.handle(req);
        }
    
        // If no token, just pass the original request
        return next.handle(req);
      }
}

