import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { boardpage } from './board.page';
import { boardpageRoutingModule } from './board-routing.module';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    boardpageRoutingModule
  ],
  declarations: [boardpage]
})
export class boardPageModule {}
