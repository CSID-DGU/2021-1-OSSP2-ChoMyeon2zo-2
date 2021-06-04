import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CatepostPageRoutingModule } from './catepost-routing.module';

import { CatepostPage } from './catepost.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CatepostPageRoutingModule
  ],
  declarations: [CatepostPage]
})
export class CatepostPageModule {}
