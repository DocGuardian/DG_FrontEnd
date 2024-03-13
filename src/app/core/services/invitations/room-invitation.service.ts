import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RoomInvitationService {
  private base_url = 'http://localhost:8080/doc_guardian/api/v1/invitations';

  constructor(private http: HttpClient) {
  }
}
