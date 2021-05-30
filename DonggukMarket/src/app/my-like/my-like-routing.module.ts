import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyLikePage } from './my-like.page';

const routes: Routes = [
  {
    path: '',
    component: MyLikePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyLikePageRoutingModule {}
