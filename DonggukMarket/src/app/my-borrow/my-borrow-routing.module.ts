import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyBorrowPage } from './my-borrow.page';

const routes: Routes = [
  {
    path: '',
    component: MyBorrowPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyBorrowPageRoutingModule {}
