import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonSearchbar, IonList, IonItem, IonInput, IonButton
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-tab3',
  templateUrl: './tab3.page.html',
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonSearchbar, IonList, IonItem, IonInput, IonButton
  ]
})
export class Tab3Page {
  name = '';
}