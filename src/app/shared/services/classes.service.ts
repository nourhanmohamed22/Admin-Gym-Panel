import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClassesService {

  public classUrl = './api/gym';

  constructor(private http: HttpClient) { }

  listclasses(): Observable<any> {
    return this.http.get<any>(`${this.classUrl}/classes`);
  }

  addClass(body: any): Observable<any> {
    return this.http.post<any>(`${this.classUrl}/classes`, body);
  }

  updateClass(body: any, id: number): Observable<any> {
    return this.http.put<any>(`${this.classUrl}/classes/${id}`, body);
  }

  deleteClass(id: number): Observable<any> {
    return this.http.delete<any>(`${this.classUrl}/classes/${id}`);
  }

}
