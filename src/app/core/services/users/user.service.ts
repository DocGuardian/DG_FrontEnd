import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpResponse } from '../../models/httpRes.model';
import { User, UserReq } from '../../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private base_url = 'http://localhost:8080/doc_guardian/api/v1/users';

  constructor(private http: HttpClient) {}

  public save(user: UserReq): Observable<HttpResponse> {
    return this.http.post<HttpResponse>(this.base_url, user);
  }

  public update(user: User): Observable<HttpResponse> {
    return this.http.put<HttpResponse>(this.base_url + `/${user.id}`, user);
  }

  public getPaginitaion(page: number, size: number): Observable<HttpResponse> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    const token = localStorage.getItem('token') as string;
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);

    return this.http.get<HttpResponse>(this.base_url + '/pages', {
      params,
      headers,
    });
  }

  public getAll(): Observable<HttpResponse> {
    const token = localStorage.getItem('token') as string;
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);

    return this.http.get<HttpResponse>(this.base_url, { headers });
  }

  public get(id: string): Observable<HttpResponse> {
    const token = localStorage.getItem('token') as string;
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);

    return this.http.get<HttpResponse>(this.base_url + `/${id}`, { headers });
  }

  public getByEmail(email: string): Observable<HttpResponse> {
    const params = new HttpParams().set('email', email);
    const token = localStorage.getItem('token') as string;

    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);

    return this.http.get<HttpResponse>(`${this.base_url}/search-by`, {
      params,
      headers,
    });
  }

  public getInvitations(id: string): Observable<HttpResponse> {
    const token = localStorage.getItem('token') as string;
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);

    return this.http.get<HttpResponse>(this.base_url + `/${id}/invitations`, {
      headers,
    });
  }

  public getNotifications(id: string): Observable<HttpResponse> {
    const token = localStorage.getItem('token') as string;
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);

    return this.http.get<HttpResponse>(this.base_url + `/${id}/notifications`, {
      headers,
    });
  }

  public delete(id: string): Observable<HttpResponse> {
    const token = localStorage.getItem('token') as string;
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);

    return this.http.delete<HttpResponse>(this.base_url + `/${id}`, {
      headers,
    });
  }
}
