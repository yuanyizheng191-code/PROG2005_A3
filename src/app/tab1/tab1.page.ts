import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonSearchbar, IonList, IonItem, IonLabel,
  IonSpinner, IonNote
} from '@ionic/angular/standalone';
import { InventoryService } from '../services/inventory.service';
import { InventoryItem } from '../models/inventory.model';

@Component({
  selector: 'app-tab1',
  templateUrl: './tab1.page.html',
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonSearchbar, IonList, IonItem, IonLabel,
    IonSpinner, IonNote
  ]
})
export class Tab1Page implements OnInit {
  inventoryList: InventoryItem[] = [];
  searchTerm = '';
  filteredList: InventoryItem[] = [];
  loading = true;

  constructor(private service: InventoryService) {}

  ngOnInit() {
    this.service.getAllItems().subscribe({
      next: data => {
        this.inventoryList = data;
        this.filteredList = [...data];
        this.loading = false;
      },
      error: err => {
        console.error(err);
        this.loading = false;
      }
    });
  }

  search() {
    const term = this.searchTerm.toLowerCase().trim();
    if (!term) {
      this.filteredList = [...this.inventoryList];
      return;
    }
    this.filteredList = this.inventoryList.filter(item =>
      item.item_name.toLowerCase().includes(term)
    );
  }
}