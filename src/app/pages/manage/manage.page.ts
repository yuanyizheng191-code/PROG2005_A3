import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InventoryService } from '../../services/inventory.service';
import { InventoryItem, Category, StockStatus } from '../../models/inventory.model';
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.page.html',
  styleUrls: ['./manage.page.scss'],
  standalone: false
})
export class ManagePage implements OnInit {
  searchForm: FormGroup;
  updateForm: FormGroup;
  searchTerm: string = '';
  foundItem: InventoryItem | null = null;
  isEditing: boolean = false;
  isLoading: boolean = false;

  categories = Object.values(Category);
  stockStatuses = Object.values(StockStatus);

  constructor(
    private fb: FormBuilder,
    private inventoryService: InventoryService,
    private alertController: AlertController,
    private loadingController: LoadingController
  ) {
    this.searchForm = this.fb.group({
      itemName: ['', Validators.required]
    });

    this.updateForm = this.fb.group({
      itemName: [{ value: '', disabled: true }],
      category: ['', Validators.required],
      quantity: [null, [Validators.required, Validators.min(0)]],
      price: [null, [Validators.required, Validators.min(0)]],
      supplierName: ['', Validators.required],
      stockStatus: ['', Validators.required],
      featuredItem: [0],
      specialNote: ['']
    });
  }

  ngOnInit() {}

  async searchItem() {
    const name = this.searchForm.get('itemName')?.value;
    if (!name) return;

    this.isLoading = true;
    this.inventoryService.getItemByName(name).subscribe({
      next: (items) => {
        this.isLoading = false;
        if (items.length > 0) {
          const item = items[0];
          this.foundItem = item;
          this.isEditing = true;
          this.updateForm.patchValue({
            itemName: item.itemName,
            category: item.category,
            quantity: item.quantity,
            price: item.price,
            supplierName: item.supplierName,
            stockStatus: item.stockStatus,
            featuredItem: item.featuredItem,
            specialNote: item.specialNote || ''
          });
          this.updateForm.get('itemName')?.enable();
        } else {
          this.foundItem = null;
          this.isEditing = false;
        }
      },
      error: async () => {
        this.isLoading = false;
        this.foundItem = null;
        this.isEditing = false;
        const alert = await this.alertController.create({
          header: 'Not Found',
          message: 'Item not found',
          buttons: ['OK']
        });
        await alert.present();
      }
    });
  }

  async updateItem() {
    if (this.updateForm.invalid || !this.foundItem) return;

    const loading = await this.loadingController.create({
      message: 'Updating item...'
    });
    await loading.present();

    const updatedItem: InventoryItem = {
      ...this.foundItem,
      ...this.updateForm.getRawValue()
    };

    this.inventoryService.updateItem(this.foundItem.itemName, updatedItem).subscribe({
      next: async (response) => {
        await loading.dismiss();
        const alert = await this.alertController.create({
          header: 'Success',
          message: response.message || 'Item updated successfully',
          buttons: ['OK']
        });
        await alert.present();
        this.resetForm();
      },
      error: async (error) => {
        await loading.dismiss();
        const alert = await this.alertController.create({
          header: 'Error',
          message: error.error?.error || 'Failed to update item',
          buttons: ['OK']
        });
        await alert.present();
      }
    });
  }

  async deleteItem() {
    if (!this.foundItem) return;

    if (this.foundItem.itemName.toLowerCase() === 'laptop') {
      const alert = await this.alertController.create({
        header: 'Forbidden',
        message: 'Deletion of "Laptop" item is not allowed',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    const confirmAlert = await this.alertController.create({
      header: 'Confirm Delete',
      message: `Are you sure you want to delete "${this.foundItem.itemName}"?`,
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        {
          text: 'Delete',
          role: 'destructive',
          handler: async () => {
            const loading = await this.loadingController.create({
              message: 'Deleting item...'
            });
            await loading.present();

            this.inventoryService.deleteItem(this.foundItem!.itemName).subscribe({
              next: async (response) => {
                await loading.dismiss();
                const alert = await this.alertController.create({
                  header: 'Success',
                  message: response.message || 'Item deleted successfully',
                  buttons: ['OK']
                });
                await alert.present();
                this.resetForm();
              },
              error: async (error) => {
                await loading.dismiss();
                const alert = await this.alertController.create({
                  header: 'Error',
                  message: error.error?.error || 'Failed to delete item',
                  buttons: ['OK']
                });
                await alert.present();
              }
            });
          }
        }
      ]
    });
    await confirmAlert.present();
  }

  resetForm() {
    this.foundItem = null;
    this.isEditing = false;
    this.searchForm.reset();
    this.updateForm.reset();
  }
}
