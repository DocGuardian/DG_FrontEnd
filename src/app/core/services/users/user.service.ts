import { Injectable } from '@angular/core';
import { User } from '../../models/user.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpResponse } from '../../models/httpRes.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private base_url = 'http://localhost:8080/doc_guardian/api/v1/users';

  constructor(private http: HttpClient) {
  }



}
