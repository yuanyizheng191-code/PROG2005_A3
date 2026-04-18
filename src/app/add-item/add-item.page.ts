import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonList, IonItem, IonInput, IonButton,
  IonToast, ToastController 
} from '@ionic/angular/standalone';
import { InventoryService } from '../services/inventory.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.page.html',
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonList, IonItem, IonInput, IonButton,
    IonToast 
  ]
})
export class AddItemPage {
  item_name = '';
  category = '';
  quantity = 0;
  price = 0;
  supplier_name = '';
  stock_status = '';
  featured_item = 0;
  special_note = '';

  constructor(
    private service: InventoryService,
    private toastCtrl: ToastController 
  ) {}

  async addItem() {
    const data = {
      item_name: this.item_name,
      category: this.category,
      quantity: this.quantity,
      price: this.price,
      supplier_name: this.supplier_name,
      stock_status: this.stock_status,
      featured_item: this.featured_item,
      special_note: this.special_note
    };

    this.service.addItem(data).subscribe({
      next: async () => {   
        const toast = await this.toastCtrl.create({
          message: 'Item added successfully',
          duration: 2000,
          color: 'success'
        });
        toast.present();
        this.clearForm();
      },
      error: async () => {
        const toast = await this.toastCtrl.create({
          message: 'Failed to add item',
          duration: 2000,
          color: 'danger'
        });
        toast.present();
      }
    });
  }

  clearForm() {
    this.item_name = '';
    this.category = '';
    this.quantity = 0;
    this.price = 0;
    this.supplier_name = '';
    this.stock_status = '';
    this.featured_item = 0;
    this.special_note = '';
  }
}