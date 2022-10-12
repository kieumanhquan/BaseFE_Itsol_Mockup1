import {User} from './../../home/profile/profile.model';
import {Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ForgotService {
  private readonly forgotAPI = `${environment.apiUrl}public/forgot/`;
  private readonly getotpAPI = `${environment.apiUrl}public/forgot/checkotp`;

  constructor(private http: HttpClient) {
  }

  sendOTP(email: any): Observable<any> {
    return this.http.get<any>(this.forgotAPI + email);
  }

  check(userId, otp: any): Observable<any> {
    return this.http.get<any>(this.getotpAPI + '?USER_ID=' + userId + '&CODE=' + otp);
  }

}

