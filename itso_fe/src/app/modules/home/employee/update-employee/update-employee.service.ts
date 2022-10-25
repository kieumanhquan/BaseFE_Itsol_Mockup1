import { environment } from './../../../../../environments/environment';
import { User } from './../../../../models/model/User';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root',
})
export class UpdateEmployeeService {
  // private readonly employeeAPI = `${environment.apiUrl}public/user`;

  // constructor(private http: HttpClient) { }

  // getListUser(): Observable<any>{
  //   return this.http.get<any>(this.employeeAPI);
  // }

  // public create(user: User): Observable<any> {
  //   return this.http.post(`${this.employeeAPI}`, user);
  // }

  // public getAllUnit(): Observable<any>{
  //   return this.http.get<any>(`${environment.apiUrl}home/getAllUnit`);
  // }

  // getUserById(id: any): Observable<any>{
  //   return this.http.get<any>(`${this.employeeAPI}/`+id);
  // }

  // public updateUser(id: any,user: User): Observable<any>{
  //   return this.http.put<any>(`${this.employeeAPI}/`+id,user);
  // }


}
