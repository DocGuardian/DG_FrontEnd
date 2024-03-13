import { HttpClient, HttpParams } from '@angular/common/http';
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
    return this.http.post<HttpResponse>(this.base_url, room);
  }

  public update(room: Room): Observable<HttpResponse> {
    return this.http.put<HttpResponse>(this.base_url + `/${room.id}`, room);
  }

  public getPaginitaion(page: number, size: number): Observable<HttpResponse> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<HttpResponse>(this.base_url + '/pages', {
      params,
    });
  }

  public getAll(): Observable<HttpResponse> {
    return this.http.get<HttpResponse>(this.base_url);
  }

  public get(id: string): Observable<HttpResponse> {
    return this.http.get<HttpResponse>(this.base_url + `/${id}`);
  }

  public delete(id: string): Observable<HttpResponse> {
    return this.http.delete<HttpResponse>(this.base_url + `/${id}`);
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
    return this.http.post<HttpResponse>(
      this.base_url + `/${roomId}/invite-by-email`,
      roomInvByEmail
    );
  }

  public inviteUser(
    senderId: string,
    recipientId: string,
    roomId: string
  ): Observable<HttpResponse> {
    let roomInv: RoomInvite = {
      senderId: senderId,
      recipientId: recipientId,
    };
    return this.http.post<HttpResponse>(
      this.base_url + `/${roomId}/invite`,
      roomInv
    );
  }
}
