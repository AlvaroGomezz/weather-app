import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuscadorComponent } from './buscador/buscador.component';
import { AppRoutingModule } from '../app-routing.module';
import { PipesModule } from '../pipes/pipes.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    BuscadorComponent
  ],
  exports : [
    BuscadorComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    PipesModule,
    FormsModule
  ]
})
export class ComponentsModule { }
