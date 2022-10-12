import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private readonly profileAPI = `${environment.apiUrl}public/user/username/`;
  private readonly putAPI = `${environment.apiUrl}public/user`;

  constructor(private http: HttpClient) {
  }

  getProfileByUserName(username: any): Observable<any> {
    return this.http.get<any>(this.profileAPI + username)
  }
  updateProfile(user: any): Observable<any>{
    return this.http.put<any>(this.putAPI,user);
  }

}
