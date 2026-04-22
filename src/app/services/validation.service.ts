import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  validateItemName(name: string): { valid: boolean; message: string } {
    if (!name || name.trim().length === 0) {
      return { valid: false, message: 'Item name is required' };
    }
    if (name.trim().length < 2) {
      return { valid: false, message: 'Item name must be at least 2 characters' };
    }
    if (name.trim().length > 100) {
      return { valid: false, message: 'Item name must not exceed 100 characters' };
    }
    return { valid: true, message: '' };
  }

  validateQuantity(quantity: number): { valid: boolean; message: string } {
    if (quantity === null || quantity === undefined) {
      return { valid: false, message: 'Quantity is required' };
    }
    if (!Number.isInteger(quantity)) {
      return { valid: false, message: 'Quantity must be an integer' };
    }
    if (quantity < 0) {
      return { valid: false, message: 'Quantity cannot be negative' };
    }
    return { valid: true, message: '' };
  }

  validatePrice(price: number): { valid: boolean; message: string } {
    if (price === null || price === undefined) {
      return { valid: false, message: 'Price is required' };
    }
    if (price < 0) {
      return { valid: false, message: 'Price cannot be negative' };
    }
    return { valid: true, message: '' };
  }
}
