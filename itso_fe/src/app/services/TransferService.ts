import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import jwt_decode from 'jwt-decode';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import { Transfer } from '../modules/home/employee/employee.model';

@Injectable({
  providedIn: 'root',
})
export class TransferService{
  private  apiServerUrlPrivate = environment.apiUrl;
  private userApi = '${environment.apiUrl}public/user';

  constructor(private http: HttpClient) {
  }
  getDecodedAccessToken(): any {
    const token = localStorage.getItem('auth-token');
    try {
      console.log(jwt_decode(token));
      return jwt_decode(token);
    } catch(Error) {
      return null;
    }
  }
  public createTransfer(transfer: Transfer): Observable<any> {
    return this.http.post(`${this.apiServerUrlPrivate}`+'public/transfer',transfer).pipe(
      tap(createTransfer => console.log(`receivedJob=${JSON.stringify(createTransfer)}`)),
    );
  }

  public updateTransger(transfer: Transfer): Observable<any> {
    return this.http.put(`${this.apiServerUrlPrivate}`+'public/transfer',transfer).pipe(
      tap(updateTransfer => console.log(`receivedJob=${JSON.stringify(updateTransfer)}`)),
    );
  }
  public getAll(): Observable<any> {
    return this.http.get<any>(`${this.apiServerUrlPrivate}`+'public/transfer');
  }
  public getUserById(id: number): Observable<any>{
    return this.http.get<any>(this.userApi + '/' +id);
  }
  public getTransferById(id: number): Observable<any>{
    return this.http.get<Transfer>(`${this.apiServerUrlPrivate}`+'public/transfer/' + id);
  }

}
