import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyBuyPage } from './my-buy.page';

const routes: Routes = [
  {
    path: '',
    component: MyBuyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyBuyPageRoutingModule {}
