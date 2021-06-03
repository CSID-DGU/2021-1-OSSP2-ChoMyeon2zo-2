import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StudentRecheckPageRoutingModule } from './student-recheck-routing.module';

import { StudentRecheckPage } from './student-recheck.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StudentRecheckPageRoutingModule
  ],
  declarations: [StudentRecheckPage]
})
export class StudentRecheckPageModule {}
