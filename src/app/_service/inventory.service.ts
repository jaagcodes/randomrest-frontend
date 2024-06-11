import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Ingredient } from '../_model/ingredient';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  private url: string = `https://microservice-inventory-n9p7.onrender.com/ingredients`;

  constructor( private http: HttpClient ) { }

  listIngredients(){
    return this.http.get<Ingredient[]>(this.url);
  }
}
