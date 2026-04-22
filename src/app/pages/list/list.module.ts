import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ListPageRoutingModule } from './list-routing.module';
import { ListPage } from './list.page';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ListPageRoutingModule,
    SharedModule
  ],
  declarations: [ListPage]
})
export class ListPageModule {}
