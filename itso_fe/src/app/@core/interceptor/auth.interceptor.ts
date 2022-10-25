<<<<<<< HEAD
import { TokenService } from './../services/token.service';
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpEvent,
  HttpHeaders, HttpResponse, HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  token: string;
  constructor(private router: Router,
    private tokeSevice: TokenService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.tokeSevice.getToken() != null) {
      const tokenInfo = this.tokeSevice.getToken();
      console.log(tokenInfo);

      const tokenizedReq = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + tokenInfo) });
      return next.handle(tokenizedReq).pipe(
        map((event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
=======
import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpInterceptor, HttpResponse } from '@angular/common/http';
import { HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { HttpHandler } from '@angular/common/http';
import { HttpEvent } from '@angular/common/http';
import { TokenService } from '../services/token.service';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class Interceptor implements HttpInterceptor {
  token: string;
  constructor(private tokenser: TokenService, private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (localStorage.getItem('token') != null) {
      const tokenInfo = localStorage.getItem('token');
      const tokenizedReq = req.clone({ headers: req.headers.set('Authorization', tokenInfo) });
      return next.handle(tokenizedReq).pipe(
        map((event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            console.log('event--->>>', event);
>>>>>>> 2a62b3230bbc58c34c03aadc8385ade341857345
          }
          return event;
        }),
        catchError((error: HttpErrorResponse) => {
          if (error['status'] === 403) {
<<<<<<< HEAD
            this.tokeSevice.removeToken();
=======
            this.tokenser.removeToken();
>>>>>>> 2a62b3230bbc58c34c03aadc8385ade341857345
            this.router.navigate(['/auth/']);
          }
          return throwError(error);
        }),
      );
    }
    return next.handle(req);
  }
<<<<<<< HEAD

=======
>>>>>>> 2a62b3230bbc58c34c03aadc8385ade341857345
}
