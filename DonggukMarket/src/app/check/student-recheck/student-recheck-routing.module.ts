import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StudentRecheckPage } from './student-recheck.page';

const routes: Routes = [
  {
    path: '',
    component: StudentRecheckPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentRecheckPageRoutingModule {}
