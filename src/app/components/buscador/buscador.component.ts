import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IMunicipios } from 'src/app/Interfaces/Interfaces.module';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.scss']
})
export class BuscadorComponent implements OnInit {

  lugar      : string        = ''
  activo     : boolean       = true
  municipios : IMunicipios[] = []

  constructor(
    private weather : WeatherService,
    private router  : Router
  ){}

  ngOnInit(): void {
    this.weather.getMunicipios().subscribe((data : any) => {
      this.municipios = data
    })
  }
  setActivo(param : boolean) : void{
    this.activo = param
  }
  navegar( codProv : string, codMun : string ) : void {
    this.router.navigate( ['municipio' , codProv, codMun ])
    this.activo = false 
  }
}
