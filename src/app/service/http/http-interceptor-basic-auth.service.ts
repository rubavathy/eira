import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { TokenStorageService } from '../tokenStorage.service';
import { Router } from '@angular/router';

const TOKEN_HEADER_KEY = 'Authorization';       // for Spring Boot back-end


@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorBasicAuthService  implements HttpInterceptor {

  constructor(private tokenStorageService: TokenStorageService, private router: Router) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {


    let authReq = req;
    const token = this.tokenStorageService.getToken();
    if (token != null) {
      console.log("User acquired Token>>");
      authReq = req.clone({ headers: req.headers.set(TOKEN_HEADER_KEY, 'Eira  ' + token) });
    }


    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMsg = '';


        if ([401, 403].includes(error.status)) {
          // auto logout if 401 or 403 response returned from api
          console.log("server returned 401 / 403 error>>");
          this.tokenStorageService.logOut();
          this.router.navigate(['/login']);

      }

        if (error.error instanceof ErrorEvent) {
          console.log('this is client side error');
          errorMsg = `Error: ${error.error.message}`;
        }
        else {
          console.log('this is server side error');
          errorMsg = `Error Code: ${error.status},  Message: ${error.message}`;
        }
        console.log(errorMsg);
        return throwError(errorMsg);
      })
    );
  }
}

