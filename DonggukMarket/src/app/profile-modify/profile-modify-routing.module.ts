import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfileModifyPage } from './profile-modify.page';

const routes: Routes = [
  {
    path: '',
    component: ProfileModifyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileModifyPageRoutingModule {}
