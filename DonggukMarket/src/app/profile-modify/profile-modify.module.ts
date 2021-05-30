import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfileModifyPageRoutingModule } from './profile-modify-routing.module';

import { ProfileModifyPage } from './profile-modify.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfileModifyPageRoutingModule
  ],
  declarations: [ProfileModifyPage]
})
export class ProfileModifyPageModule {}
