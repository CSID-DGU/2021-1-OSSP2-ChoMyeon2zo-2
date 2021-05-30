import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MySellPageRoutingModule } from './my-sell-routing.module';

import { MySellPage } from './my-sell.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MySellPageRoutingModule
  ],
  declarations: [MySellPage]
})
export class MySellPageModule {}
