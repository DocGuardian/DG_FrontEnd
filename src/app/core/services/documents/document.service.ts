import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DocReq } from '../../models/document.model';
import { HttpResponse } from '../../models/httpRes.model';

@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  private base_url = 'http://localhost:8080/doc_guardian/api/v1/documents';

  constructor(private http: HttpClient) {}

  public save(doc: DocReq): Observable<HttpResponse> {
    const formData = new FormData();

    formData.append('sender.id', doc.sender.id);
    formData.append('room.id', doc.room.id);
    formData.append('name', doc.docUrl.name); // Use docUrl correctly here
    formData.append('size', doc.size.toString()); // Size is already a number
    formData.append('type', doc.type);

    if (doc.docUrl instanceof File) {
      formData.append('docUrl', doc.docUrl, doc.docUrl.name);
    }

    return this.http.post<HttpResponse>(this.base_url, formData);
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

  public getByRoom(id: string): Observable<HttpResponse> {
    return this.http.get<HttpResponse>(this.base_url + `/${id}/docs`);
  }

  public get(id: string): Observable<HttpResponse> {
    return this.http.get<HttpResponse>(this.base_url + `/${id}`);
  }

  public delete(id: string): Observable<HttpResponse> {
    return this.http.delete<HttpResponse>(this.base_url + `/${id}`);
  }
}
