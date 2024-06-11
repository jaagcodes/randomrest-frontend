import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private apiUrl = 'https://microservice-order-ytol.onrender.com';

  constructor(private http: HttpClient) { }

  createOrder(): Observable<any> {
    return this.http.post<any>(this.apiUrl, {});
  }
}
