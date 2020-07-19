import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Tab4detallePage } from './tab4detalle.page';

const routes: Routes = [
  {
    path: '',
    component: Tab4detallePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Tab4detallePageRoutingModule {}
