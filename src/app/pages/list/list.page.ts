import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../../services/inventory.service';
import { InventoryItem } from '../../models/inventory.model';
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
  standalone: false
})
export class ListPage implements OnInit {
  items: InventoryItem[] = [];
  filteredItems: InventoryItem[] = [];
  searchTerm: string = '';
  isLoading: boolean = false;

  constructor(
    private inventoryService: InventoryService,
    private alertController: AlertController,
    private loadingController: LoadingController
  ) {}

  ngOnInit() {
    this.loadItems();
  }

  async loadItems() {
    this.isLoading = true;
    this.inventoryService.getAllItems().subscribe({
      next: (data) => {
        this.items = data;
        this.filteredItems = data;
        this.isLoading = false;
      },
      error: async (error) => {
        this.isLoading = false;
        const alert = await this.alertController.create({
          header: 'Error',
          message: 'Failed to load inventory items',
          buttons: ['OK']
        });
        await alert.present();
      }
    });
  }

  search() {
    if (!this.searchTerm.trim()) {
      this.filteredItems = this.items;
      return;
    }
    this.filteredItems = this.items.filter(item =>
      item.itemName.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  async searchByName() {
    if (!this.searchTerm.trim()) {
      const alert = await this.alertController.create({
        header: 'Validation',
        message: 'Please enter an item name to search',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    this.isLoading = true;
    this.inventoryService.getItemByName(this.searchTerm).subscribe({
      next: (items) => {
        this.isLoading = false;
        this.filteredItems = items;
      },
      error: async (error) => {
        this.isLoading = false;
        this.filteredItems = this.items;
        const alert = await this.alertController.create({
          header: 'Not Found',
          message: `No item found with name: ${this.searchTerm}`,
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

  async doRefresh(event: any) {
    this.inventoryService.getAllItems().subscribe({
      next: (data) => {
        this.items = data;
        this.filteredItems = data;
        this.searchTerm = '';
        event.target.complete();
      },
      error: () => {
        event.target.complete();
      }
    });
  }
}
