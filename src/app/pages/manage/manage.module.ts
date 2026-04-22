import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ManagePageRoutingModule } from './manage-routing.module';
import { ManagePage } from './manage.page';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ManagePageRoutingModule,
    SharedModule
  ],
  declarations: [ManagePage]
})
export class ManagePageModule {}
