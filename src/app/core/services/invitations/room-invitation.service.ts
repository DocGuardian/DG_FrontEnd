import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RoomReq } from '../../models/room.model';
import { HttpResponse } from '../../models/httpRes.model';
import { Invitation } from '../../models/room-invitate.model';

@Injectable({
  providedIn: 'root',
})
export class RoomInvitationService {
  private base_url = 'http://localhost:8080/doc_guardian/api/v1/invitations';

  constructor(private http: HttpClient) {}

  public update(room: Invitation): Observable<HttpResponse> {
    const token = localStorage.getItem('token') as string;
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);

    return this.http.put<HttpResponse>(this.base_url + `/${room.id}`, room, {
      headers,
    });
  }

  public getPaginitaion(page: number, size: number): Observable<HttpResponse> {
    const token = localStorage.getItem('token') as string;
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);

    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

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

  public delete(id: string): Observable<HttpResponse> {
    const token = localStorage.getItem('token') as string;
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);

    return this.http.delete<HttpResponse>(this.base_url + `/${id}`, {
      headers,
    });
  }
}
