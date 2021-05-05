import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PhoneCheckPageRoutingModule } from './phone-check-routing.module';

import { PhoneCheckPage } from './phone-check.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PhoneCheckPageRoutingModule
  ],
  declarations: [PhoneCheckPage]
})
export class PhoneCheckPageModule {}
