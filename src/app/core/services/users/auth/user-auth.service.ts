import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {
  private base_url = 'http://localhost:8080/doc_guardian/api/v1/auth';

  constructor(private http: HttpClient) {
  }

}
