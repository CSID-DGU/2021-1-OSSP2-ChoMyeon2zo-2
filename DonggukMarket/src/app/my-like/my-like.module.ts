import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyLikePageRoutingModule } from './my-like-routing.module';

import { MyLikePage } from './my-like.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyLikePageRoutingModule
  ],
  declarations: [MyLikePage]
})
export class MyLikePageModule {}
