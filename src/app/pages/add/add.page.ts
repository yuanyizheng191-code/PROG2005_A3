import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InventoryService } from '../../services/inventory.service';
import { ValidationService } from '../../services/validation.service';
import { InventoryItem, Category, StockStatus } from '../../models/inventory.model';
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
  standalone: false
})
export class AddPage implements OnInit {
  addForm: FormGroup;
  featuredItems: InventoryItem[] = [];
  categories = Object.values(Category);
  stockStatuses = Object.values(StockStatus);
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private inventoryService: InventoryService,
    private validationService: ValidationService,
    private alertController: AlertController,
    private loadingController: LoadingController
  ) {
    this.addForm = this.fb.group({
      itemName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      category: ['', Validators.required],
      quantity: [null, [Validators.required, Validators.min(0)]],
      price: [null, [Validators.required, Validators.min(0)]],
      supplierName: ['', Validators.required],
      stockStatus: ['', Validators.required],
      featuredItem: [0],
      specialNote: ['']
    });
  }

  ngOnInit() {
    this.loadFeaturedItems();
  }

  async loadFeaturedItems() {
    this.isLoading = true;
    this.inventoryService.getAllItems().subscribe({
      next: (items) => {
        this.featuredItems = items.filter(item => item.featuredItem === 1);
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  async onSubmit() {
    if (this.addForm.invalid) {
      const alert = await this.alertController.create({
        header: 'Validation Error',
        message: 'Please fill in all required fields correctly',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    const loading = await this.loadingController.create({
      message: 'Adding item...'
    });
    await loading.present();

    const formValue = this.addForm.value;
    const newItem: InventoryItem = {
      ...formValue,
      featuredItem: formValue.featuredItem ? 1 : 0,
      specialNote: formValue.specialNote || ''
    };

    this.inventoryService.createItem(newItem).subscribe({
      next: async (response) => {
        await loading.dismiss();
        const alert = await this.alertController.create({
          header: 'Success',
          message: response.message || 'Item added successfully',
          buttons: [{
            text: 'OK',
            handler: () => {
              this.addForm.reset({ featuredItem: 0 });
              this.loadFeaturedItems();
            }
          }]
        });
        await alert.present();
      },
      error: async (error) => {
        await loading.dismiss();
        const alert = await this.alertController.create({
          header: 'Error',
          message: error.error?.error || 'Failed to add item',
          buttons: ['OK']
        });
        await alert.present();
      }
    });
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'In Stock':
        return 'success';
      case 'Low Stock':
        return 'warning';
      case 'Out of Stock':
        return 'danger';
      default:
        return 'primary';
    }
  }
}
