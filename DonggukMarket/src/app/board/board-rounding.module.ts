import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { boardpage } from './board.page';

const routes: Routes = [
  {
    path: '',
    component: boardpage,
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class boardpageRoutingModule {}
