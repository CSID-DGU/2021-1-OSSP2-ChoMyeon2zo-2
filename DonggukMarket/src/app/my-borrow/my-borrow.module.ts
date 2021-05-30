import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyBorrowPageRoutingModule } from './my-borrow-routing.module';

import { MyBorrowPage } from './my-borrow.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyBorrowPageRoutingModule
  ],
  declarations: [MyBorrowPage]
})
export class MyBorrowPageModule {}
