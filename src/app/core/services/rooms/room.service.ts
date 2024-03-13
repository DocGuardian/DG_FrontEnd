import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  private base_url = 'http://localhost:8080/doc_guardian/api/v1/rooms';

  constructor(private http: HttpClient) {
  }

}
