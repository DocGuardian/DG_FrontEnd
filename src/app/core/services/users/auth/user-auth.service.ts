import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpResponse } from 'src/app/core/models/httpRes.model';
import { User, UserReq } from 'src/app/core/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserAuthService {
  private auth_url = 'http://localhost:8080/doc_guardian/api/v1/auth/';

  constructor(private http: HttpClient) {}

  public login(data: any): Observable<HttpResponse> {
    return this.http.post<HttpResponse>(this.auth_url + 'login', data);
  }

  public register(user: UserReq): Observable<HttpResponse> {
    return this.http.post<HttpResponse>(this.auth_url + 'register', user);
  }

  public verifyAccount(token: string): Observable<HttpResponse> {
    const params = new HttpParams().set('token', token.toString());
    return this.http.get<HttpResponse>(this.auth_url + 'account-verification', {
      params,
    });
  }

  public reSendVerification(token: string): Observable<HttpResponse> {
    const params = new HttpParams().set('token', token.toString());
    return this.http.get<HttpResponse>(
      this.auth_url + 'account-verification-re-send',
      {
        params,
      }
    );
  }

  public sendResetPassword(email: string): Observable<HttpResponse> {
    return this.http.post<HttpResponse>(
      this.auth_url + 'account-reset-password',
      email
    );
  }

  public resetPassword(
    password: string,
    token: string
  ): Observable<HttpResponse> {
    return this.http.post<HttpResponse>(
      this.auth_url + `account-reset-password/${token}`,
      password
    );
  }

  formatUser(res: HttpResponse) {
    let userRes = res.data.response;
    const user: User = {
      id: userRes.id,
      first_name: userRes.first_name,
      last_name: userRes.last_name,
      email: userRes.email,
      password: userRes.password,
      phone: userRes.phone,
      imageUrl: userRes.imageUrl,
      isEnabled: userRes.isEnabled,
      isLocked: userRes.isLocked,
      role: userRes.role,
      enable_tfa: userRes.enable_tfa,
      createdAt: userRes.createdAt,
      updatedAt: userRes.updatedAt,
    };
    return user;
  }
}
