import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {

  constructor(
    private router : Router
  ) { }

  /* Le decimos que la página de inicio cargue por defecto el municipio de Madrid. */
  ngOnInit(): void {
    this.router.navigate(['/municipio/28/28079000000']);
  }
}
