import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyBuyPageRoutingModule } from './my-buy-routing.module';

import { MyBuyPage } from './my-buy.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyBuyPageRoutingModule
  ],
  declarations: [MyBuyPage]
})
export class MyBuyPageModule {}
