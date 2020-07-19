import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Tab4detallePageRoutingModule } from './tab4detalle-routing.module';

import { Tab4detallePage } from './tab4detalle.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Tab4detallePageRoutingModule
  ],
  declarations: [Tab4detallePage]
})
export class Tab4detallePageModule {}
