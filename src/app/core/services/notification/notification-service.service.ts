import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpResponse } from '../../models/httpRes.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationServiceService {
  private base_url = 'http://localhost:8080/doc_guardian/api/v1/notifications';

  constructor(private http: HttpClient) {}

  public delete(id: string): Observable<HttpResponse> {
    const token = localStorage.getItem('token') as string;
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);

    return this.http.delete<HttpResponse>(this.base_url + `/${id}`, {
      headers,
    });
  }
}
