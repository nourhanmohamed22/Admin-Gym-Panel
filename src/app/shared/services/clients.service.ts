import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  public clientUrl = './api/gym';

  constructor(private http: HttpClient) { }

  listclients(): Observable<any> {
    return this.http.get<any>(`${this.clientUrl}/clients`);
  }

  addClient(body: any): Observable<any> {
    return this.http.post<any>(`${this.clientUrl}/clients`, body);
  }

  updateClient(body: any, id: number): Observable<any> {
    return this.http.put<any>(`${this.clientUrl}/clients/${id}`, body);
  }

  getclientById(id: number): Observable<any> {
    return this.http.get<any>(`${this.clientUrl}/clients/${id}`);
  }

  deleteClient(id: number): Observable<any> {
    return this.http.delete<any>(`${this.clientUrl}/clients/${id}`);
  }

}
