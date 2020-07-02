import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Tab1detallePage } from './tab1detalle.page';

const routes: Routes = [
  {
    path: '',
    component: Tab1detallePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Tab1detallePageRoutingModule {}
