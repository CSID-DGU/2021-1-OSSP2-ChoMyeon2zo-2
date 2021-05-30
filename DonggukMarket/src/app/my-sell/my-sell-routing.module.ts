import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MySellPage } from './my-sell.page';

const routes: Routes = [
  {
    path: '',
    component: MySellPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MySellPageRoutingModule {}
