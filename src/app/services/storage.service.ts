import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private storage: Storage | null = null;

  constructor() {
    this.initStorage();
  }

  private async initStorage() {
    this.storage = new Storage({
      name: 'inventory-db'
    });
    await this.storage.create();
  }

  async set(key: string, value: any): Promise<void> {
    if (this.storage) {
      await this.storage.set(key, JSON.stringify(value));
    }
  }

  async get(key: string): Promise<any> {
    if (this.storage) {
      const value = await this.storage.get(key);
      return value ? JSON.parse(value) : null;
    }
    return null;
  }

  async remove(key: string): Promise<void> {
    if (this.storage) {
      await this.storage.remove(key);
    }
  }
}
