import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ResetPassService {
  const // @ts-ignore

  private readonly apiUrl = `${environment.apiUrl}auth/rest/`;

  constructor(private http: HttpClient) {
  }
  updateUser(id: any, user: any): Observable<any>{
    return this.http.put<any>(this.apiUrl + id,user);
  }

}
