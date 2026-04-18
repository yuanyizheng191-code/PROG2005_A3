import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonList, IonItem, IonLabel, IonSpinner
} from '@ionic/angular/standalone';
import { InventoryService } from '../services/inventory.service';
import { InventoryItem } from '../models/inventory.model';

@Component({
  selector: 'app-featured',
  templateUrl: './featured.page.html',
  standalone: true,
  imports: [
    CommonModule,
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonList, IonItem, IonLabel, IonSpinner
  ]
})
export class FeaturedPage implements OnInit {
  featuredList: InventoryItem[] = [];
  loading = true;

  constructor(private service: InventoryService) {}

  ngOnInit() {
    this.service.getAllItems().subscribe(data => {
      this.featuredList = data.filter(i => i.featured_item === 1);
      this.loading = false;
    });
  }
}