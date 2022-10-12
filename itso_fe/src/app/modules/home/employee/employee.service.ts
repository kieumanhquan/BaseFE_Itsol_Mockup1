import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {User} from "./employee.model";
import {environment} from "../../../../environments/environment";

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'Application/json'})
}
const apiUrl = 'https://5f0c7a5911b7f60016055e6c.mockapi.io/Api/ahihi';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  const // @ts-ignore
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'Application/json'})
  }
  private readonly apiUrl = `${environment.apiUrl}public/user`;

  // @ts-ignore
  @Injectable({
    providedIn: 'root'
  })
  constructor(private http: HttpClient) {
  }

  getAll(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
