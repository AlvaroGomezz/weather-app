import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InicioComponent } from './inicio/inicio.component';
import { LugarComponent } from './lugar/lugar.component';
import { ComponentsModule } from '../components/components.module';
import { AppRoutingModule } from '../app-routing.module';



@NgModule({
  declarations: [
    InicioComponent,
    LugarComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    AppRoutingModule
  ]
})
export class PagesModule { }
