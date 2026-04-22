import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AddPageRoutingModule } from './add-routing.module';
import { AddPage } from './add.page';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AddPageRoutingModule,
    SharedModule
  ],
  declarations: [AddPage]
})
export class AddPageModule {}
