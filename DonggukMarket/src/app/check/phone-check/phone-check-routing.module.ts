import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PhoneCheckPage } from './phone-check.page';

const routes: Routes = [
  {
    path: '',
    component: PhoneCheckPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PhoneCheckPageRoutingModule {}
