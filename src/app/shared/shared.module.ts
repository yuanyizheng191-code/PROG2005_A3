import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HelpWidgetComponent } from '../components/help-widget/help-widget.component';
import { InventoryCardComponent } from '../components/inventory-card/inventory-card.component';
import { SearchBarComponent } from '../components/search-bar/search-bar.component';

@NgModule({
  declarations: [
    HelpWidgetComponent,
    InventoryCardComponent,
    SearchBarComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ],
  exports: [
    HelpWidgetComponent,
    InventoryCardComponent,
    SearchBarComponent
  ]
})
export class SharedModule {}
