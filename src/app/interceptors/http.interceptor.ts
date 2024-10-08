import { HttpErrorResponse, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';

export const httpInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const toasttr = inject(ToastrService);
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage = '';

      if(error.error instanceof ErrorEvent){
        console.error('An error occurred: ', error.error.message);
        errorMessage = 'An error occurred: ' + error.error.message;
        
      }else{
        console.error(`Backend returned code ${error.status}, ` + `Message: ${error.message}`);
        errorMessage = `Backend returned code ${error.status}, ` + `Message: ${error.message}`;
      }  

      if(error.status === 404) errorMessage = "Item not found";
      else if(error.status === 500) errorMessage = "Interal server error";
      else if (error.status === 401) errorMessage = "Unauthorized";
      else errorMessage = "An error occured"; 
      toasttr.error(errorMessage);
      return throwError(() => errorMessage);
    })
  );
};

// export const httpInterceptor(): HttpInterceptorFn {
//   constructor(private toastr: ToastrService) {}

//   intercepte

// }
