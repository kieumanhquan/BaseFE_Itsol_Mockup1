import { Injectable } from '@angular/core';
import {User} from '../../home/profile/profile.model';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {FormControl} from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ChangepassService {
  private readonly changepassAPI = `${environment.apiUrl}public/`;
  constructor(private http: HttpClient) {}

  change(userId,password: any): Observable<any> {
    return this.http.put<any>(this.changepassAPI + 'changepass/' + userId,password);
  }

}
