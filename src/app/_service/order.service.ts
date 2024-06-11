import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private url: string = `https://microservice-order-ytol.onrender.com/orders`;

  constructor( private http: HttpClient ) { }

  listPurchaseHistory(p: number, l:number){
    return this.http.get<any>(`${this.url}?page=${p}&limit=${l}`);
  }
}
