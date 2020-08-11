import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { Tab1detallePageRoutingModule } from './tab1detalle-routing.module';
import { Tab1detallePage } from './tab1detalle.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Tab1detallePageRoutingModule
  ],
  declarations: [Tab1detallePage]
})
export class Tab1detallePageModule {}
