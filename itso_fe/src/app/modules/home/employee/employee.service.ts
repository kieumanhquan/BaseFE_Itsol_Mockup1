import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { User } from './employee.model';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private readonly employeeAPI = `${environment.apiUrl}public/user`;

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<any> {
    return this.http.get<any>(this.employeeAPI);
  }

  addEmployee(user: User): Observable<any> {
    return this.http.post(this.employeeAPI, user);
  }

  getUserById(id: any): Observable<any> {
    return this.http.get<any>(`${this.employeeAPI}/` + id);
  }

  public getAllUnit(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}public/getAllUnit`);
  }

  public updateUser(id: any, user: User): Observable<any> {
    return this.http.put<any>(`${this.employeeAPI}/` + id, user);
  }

  public getPageTransfer(indexPage: any, idUser: any, sortBy: any,
    descAsc: any, dto: any): Observable<any> {
    return this.http.put<any>(this.employeeAPI + '/sortByKey?page=' + indexPage
      + '&id=' + idUser + '&sortByValue=' + sortBy +
      '&descAsc=' + descAsc, dto);
  }

  public deactivated(id: any): Observable<any> {
    return this.http.put<any>(`${this.employeeAPI}/deactivated/` + id, null);
  }
};

