import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TradePage } from './trade.page';

const routes: Routes = [
  {
    path: '',
    component: TradePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TradePageRoutingModule {}


