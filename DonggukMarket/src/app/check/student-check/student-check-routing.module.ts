import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StudentCheckPage } from './student-check.page';

const routes: Routes = [
  {
    path: '',
    component: StudentCheckPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentCheckPageRoutingModule {}
