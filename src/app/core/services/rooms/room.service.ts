import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Room, RoomReq } from '../../models/room.model';
import { Observable } from 'rxjs';
import { HttpResponse } from '../../models/httpRes.model';
import {
  RoomInvite,
  RoomInviteByEmail,
} from '../../models/room-invitate.model';

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  private base_url = 'http://localhost:8080/doc_guardian/api/v1/rooms';

  constructor(private http: HttpClient) {}

  public save(room: RoomReq): Observable<HttpResponse> {
    const token = localStorage.getItem('token') as string;
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http.post<HttpResponse>(this.base_url, room, { headers });
  }

  public update(room: Room): Observable<HttpResponse> {
    const token = localStorage.getItem('token') as string;
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);

    return this.http.put<HttpResponse>(this.base_url + `/${room.id}`, room);
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

  public inviteUserByEmail(
    userId: string,
    email: string,
    roomId: string
  ): Observable<HttpResponse> {
    let roomInvByEmail: RoomInviteByEmail = {
      userId: userId,
      email: email,
    };
    const token = localStorage.getItem('token') as string;
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);

    return this.http.post<HttpResponse>(
      this.base_url + `/${roomId}/invite-by-email`,
      roomInvByEmail,
      { headers }
    );
  }

  public inviteUser(
    senderId: string,
    recipientId: string,
    roomId: string
  ): Observable<HttpResponse> {
    const token = localStorage.getItem('token') as string;
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);

    let roomInv: RoomInvite = {
      senderId: senderId,
      recipientId: recipientId,
    };

    return this.http.post<HttpResponse>(
      this.base_url + `/${roomId}/invite`,
      roomInv,
      { headers }
    );
  }
}
