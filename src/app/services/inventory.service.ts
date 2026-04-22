import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { InventoryItem, ApiResponse } from '../models/inventory.model';
import { API_ENDPOINT } from '../shared/constants';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  private baseUrl = API_ENDPOINT;

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json'
    });
  }

  private transformToApiFormat(item: any): any {
    return {
      item_name: item.itemName,
      category: item.category,
      quantity: item.quantity,
      price: item.price,
      supplier_name: item.supplierName,
      stock_status: item.stockStatus,
      featured_item: item.featuredItem,
      special_note: item.specialNote
    };
  }

  private transformFromApi(item: any): InventoryItem {
    return {
      itemId: item.item_id,
      itemName: item.item_name,
      category: item.category,
      quantity: item.quantity,
      price: item.price,
      supplierName: item.supplier_name,
      stockStatus: item.stock_status,
      featuredItem: item.featured_item,
      specialNote: item.special_note
    };
  }

  getAllItems(): Observable<InventoryItem[]> {
    return this.http.get<any[]>(this.baseUrl).pipe(
      map(items => items.map(item => this.transformFromApi(item)))
    );
  }

  getItemByName(name: string): Observable<InventoryItem[]> {
    return this.http.get<any[]>(`${this.baseUrl}/${encodeURIComponent(name)}`).pipe(
      map(items => items.map(item => this.transformFromApi(item)))
    );
  }

  createItem(item: InventoryItem): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(
      this.baseUrl,
      this.transformToApiFormat(item),
      { headers: this.getHeaders() }
    );
  }

  updateItem(name: string, item: InventoryItem): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(
      `${this.baseUrl}/${encodeURIComponent(name)}`,
      this.transformToApiFormat(item),
      { headers: this.getHeaders() }
    );
  }

  deleteItem(name: string): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(
      `${this.baseUrl}/${encodeURIComponent(name)}`
    );
  }
}
