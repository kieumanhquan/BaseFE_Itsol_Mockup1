import { User } from './../../../@core/models/user';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',

})

export class ForgotService {
  private readonly forgotAPI = `${environment.apiUrl}public/forgot/`;

  constructor(private http: HttpClient) { }

  putChangepass(email: any): Observable<any>{
    return this.http.get<any>(this.forgotAPI + email);
  }

  putConfirm(user: User): Observable<any>{
    return this.http.put<any>(this.forgotAPI +'changepass',user);
  }
}
