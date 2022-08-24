import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IData, IMunicipios } from '../Interfaces/Interfaces.module';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(
    private http : HttpClient
  ){}

  getMunicipios() : Observable<IMunicipios[]>{
    return this.http.get<IMunicipios[]>('https://www.el-tiempo.net/api/json/v2/municipios')
  }
  getWeather(idProv : string, idMunicipio : string) : Observable<IData[]>{
    return this.http.get<IData[]>('https://www.el-tiempo.net/api/json/v2/provincias/'+idProv+'/municipios/'+idMunicipio)
  }
  
}
