import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InventoryItem } from '../models/inventory.model';

@Injectable({ providedIn: 'root' })
export class InventoryService {
  private API_URL = 'https://prog2005.it.scu.edu.au/ArtGalley';

  constructor(private http: HttpClient) {}

  getAllItems(): Observable<InventoryItem[]> {
    return this.http.get<InventoryItem[]>(this.API_URL);
  }

  getItemByName(name: string): Observable<InventoryItem> {
    return this.http.get<InventoryItem>(`${this.API_URL}/${name}`);
  }

  // New on the second day: Add product
  addItem(item: any): Observable<any> {
    return this.http.post(this.API_URL, item);
  }
}