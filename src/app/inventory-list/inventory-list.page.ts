import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonSearchbar, IonList, IonItem, IonLabel, IonSpinner
} from '@ionic/angular/standalone';
import { InventoryService } from '../services/inventory.service';
import { InventoryItem } from '../models/inventory.model';

@Component({
  selector: 'app-inventory-list',
  templateUrl: './inventory-list.page.html',
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonSearchbar, IonList, IonItem, IonLabel, IonSpinner
  ]
})
export class InventoryListPage implements OnInit {
  inventoryList: InventoryItem[] = [];
  searchTerm = '';
  filteredList: InventoryItem[] = [];
  loading = true;

  constructor(private service: InventoryService) {}

  ngOnInit() {
    this.service.getAllItems().subscribe(data => {
      this.inventoryList = data;
      this.filteredList = [...data];
      this.loading = false;
    });
  }

  search() {
    const t = this.searchTerm.toLowerCase();
    this.filteredList = this.inventoryList.filter(i =>
      i.item_name.toLowerCase().includes(t)
    );
  }
}