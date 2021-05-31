import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CreditPageRoutingModule } from './credit-routing.module';
import { CreditPage } from './credit.page';
import { AngularFirestore } from 'angularfire2/firestore';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreditPageRoutingModule
  ],
  declarations: [CreditPage],
  providers:[AngularFirestore]
})
export class CreditPageModule {}




