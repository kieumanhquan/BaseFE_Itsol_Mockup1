import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {User} from './employee.model';

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
    return this.http.post<any>(this.employeeAPI, user);
  }
};

