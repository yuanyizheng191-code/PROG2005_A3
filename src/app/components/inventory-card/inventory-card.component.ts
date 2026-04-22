import { Component, Input } from '@angular/core';
import { InventoryItem } from '../../models/inventory.model';

@Component({
  selector: 'app-inventory-card',
  templateUrl: './inventory-card.component.html',
  styleUrls: ['./inventory-card.component.scss'],
  standalone: false
})
export class InventoryCardComponent {
  @Input() item!: InventoryItem;

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

  isFeatured(): boolean {
    return this.item.featuredItem === 1;
  }
}
