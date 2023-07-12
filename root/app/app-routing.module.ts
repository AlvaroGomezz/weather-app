import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';
import { LugarComponent } from './pages/lugar/lugar.component';

const routes: Routes = [
  {path : ''          , component : InicioComponent},
  {path : 'municipio/:idProv/:idMunicipio' , component : LugarComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
