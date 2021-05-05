import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StudentCheckPageRoutingModule } from './student-check-routing.module';

import { StudentCheckPage } from './student-check.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StudentCheckPageRoutingModule
  ],
  declarations: [StudentCheckPage]
})
export class StudentCheckPageModule {}
