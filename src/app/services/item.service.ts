import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from '../models/item.model';
@Injectable({
  providedIn: 'root',
})
export class ItemService {
  private apiUrl = 'assets/data/items.json';
  constructor(private http: HttpClient) {}

  getItems(): Observable<Item[]> {
    console.log('getItems');
    return this.http.get<Item[]>(this.apiUrl);
  }

  addItem(item: Item): Observable<Item> {
    return this.http.post<Item>(this.apiUrl, item);
  }

  editItem(item: Item): Observable<Item> {
    return this.http.patch<Item>(this.apiUrl, item);
  }
}
