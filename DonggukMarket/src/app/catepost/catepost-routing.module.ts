import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CatepostPage } from './catepost.page';

const routes: Routes = [
  {
    path: '',
    component: CatepostPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CatepostPageRoutingModule {}
