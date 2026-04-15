import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonList, IonItem, IonInput, IonButton
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.page.html',
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonList, IonItem, IonInput, IonButton
  ]
})
export class AddItemPage {
  itemName = '';
}