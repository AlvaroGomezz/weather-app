import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IImagenes, IWeatherData, IWeatherProxDias } from 'src/app/Interfaces/Interfaces.module';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-lugar',
  templateUrl: './lugar.component.html',
  styleUrls: ['./lugar.component.scss']
})
export class LugarComponent implements OnInit {

  /* Creamos un objeto con las propiedades principales de nuestra página. */
  weatherData : IWeatherData = {
    municipio         : '',
    provincia         : '',
    temperaturaActual : '',
    viento            : '',
    humedad           : '',
    temperaturaMin    : '',
    temperaturaMax    : '',
    ocaso             : '',
    estadoDelCielo    : '',
    descripcion       : '',
  }
  /* Creamos un array con las imágenes e iconos de nuestra página. */
  imagenes : IImagenes[] = [
    {src : '../../../assets/images/despejado1.png', icono : '../../../assets/images/iconoSol.png'      },
    {src : '../../../assets/images/despejado2.png', icono : '../../../assets/images/iconoSol.png'      },
    {src : '../../../assets/images/lluvia1.png'   , icono : '../../../assets/images/iconoLluvia.png'   },
    {src : '../../../assets/images/lluvia2.png'   , icono : '../../../assets/images/iconoLluvia.png'   },
    {src : '../../../assets/images/niebla.png'    , icono : '../../../assets/images/iconoNubes.png'    },
    {src : '../../../assets/images/nieve.png'     , icono : '../../../assets/images/iconoNieve.png'    },
    {src : '../../../assets/images/nuboso.png'    , icono : '../../../assets/images/iconoSolNubes.png' },
    {src : '../../../assets/images/muyNuboso.png' , icono : '../../../assets/images/iconoNubes.png'    },
  ]
  /* Creamos un array de objetos con la información esencial de los días próximos. */
  weatherProxDias : IWeatherProxDias[] = [
    {fecha : '' , estadoDelCielo : '', temperaturaMin : 0, temperaturaMax : 0, icono : ''},
    {fecha : '' , estadoDelCielo : '', temperaturaMin : 0, temperaturaMax : 0, icono : ''},
    {fecha : '' , estadoDelCielo : '', temperaturaMin : 0, temperaturaMax : 0, icono : ''},
    {fecha : '' , estadoDelCielo : '', temperaturaMin : 0, temperaturaMax : 0, icono : ''},
  ]
  /* Creamos un array con los días de la semana y otro con los meses del año. */
  semana : string[] = ['Domingo', 'Lunes'   , 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo']
  año    : string[] = ['Enero'  , 'Febrero' , 'Marzo' , 'Abril'    , 'Mayo'  , 'Junio'  , 'Julio' , 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
  
  /* Creamos las diferentes propiedades para poder mostrar el día, la hora y el minuto exacto en el que estamos.*/
  diaSemana : string = this.semana[new Date().getDay()]
  diaMes    : number = new Date().getDate()
  mes       : string = this.año[new Date().getMonth()]
  hora      : number = new Date().getHours()
  minuto    : string|number = new Date().getMinutes() < 10 ? '0'+new Date().getMinutes() : new Date().getMinutes()

  /* Diferentes propiedades */
  diaNoche   : string = ''
  imagen     : string = ''
  iconoCielo : string = ''
  iconoHoy   : string = ''

  /* Creamos una función para determinar el momento del día en el que estamos. */
  estadoDia() : void{
    if (this.hora >= 6 && this.hora <= 12) {
      this.diaNoche = 'dia'
    }else if(this.hora > 12 && this.hora < 21){
      this.diaNoche = 'tarde'
    }else if(this.hora >= 21 || this.hora < 6){
      this.diaNoche = 'noche'
    }
  }

  /* Creamos una función para determinar el estado del cielo. La Api nos proporciona un array de números (algunos con letra, de ahí el uso de parseInt) que iteraremos y meteremos en un array nuevo. La propiedad cieloPorHoras sumará todos los valores del array y los dividirá entre la longitud de este para así determinar una media. Finalmente, establecemos condiciones para determinar cuál es el estado del cielo en función de esa media. */
  comoEstaElCielo(array : any) : string{
    let cielo = []
    let estado = ''
    let cieloPorHoras = 0
    for (let i = 0; i < array.length; i++) {
      cielo.push(parseInt(array[i]));
    }
    /* A veces, la Api nos devuelve un solo número en vez de un array de ellos, por tanto el método reduce no es aplicable. Le indicamos que si el parámetro que le pasamos (array) es de tipo 'array' lleve acabo el método reduce, y si no, la media (cieloPorHoras) es directamente igual al parámetro. */
    if(Array.isArray(array)){
      cieloPorHoras = (cielo.reduce((valor, valorPrevio) => valor + valorPrevio) / array.length);
    }else{
      cieloPorHoras = array
    }
    /* Condiciones para determinar el estado del cielo */
    if(cieloPorHoras >= 10 && cieloPorHoras < 13){
      estado = 'despejado'
    }else if(cieloPorHoras >= 13 && cieloPorHoras < 15){
      estado = 'poco nuboso'
    }else if(cieloPorHoras < 23 && cieloPorHoras >= 15){
      estado = 'nuboso'
    }else if(cieloPorHoras >= 23){
      estado = 'lluvia'
    }else if(cieloPorHoras >= 33 && cieloPorHoras <= 36){
      estado = 'nieve'
    } 
    return estado;
  }
  /* Creamos una función para determinar las propiedades principales de los días próximos. La Api nos proporciona un array de objetos con información. El primer objeto, de posición 0, contiene la información de 'mañana'; el de posición 1, contiene la información de 'pasado mañana' y así sucesivamente. 
  
  1. Lo primero será determinar el día de la semana según la fecha que contiene el objeto (mediante substr(0,3) le indicamos que sustraiga las primeras tres letras, para que así en vez de Sábado sea Sáb).
  2. Acto seguido determinaremos el estado del cielo mediante la función anterior pasándole un nuevo parámetro.
  3. Por último, los otros dos datos que nos interesan son la temperatura máxima y mínima.
  */
  cieloProxDias(array : any) : void{
    for (let i = 0; i < this.weatherProxDias.length; i++) {
      this.weatherProxDias[i].fecha          = this.semana[new Date(array.proximos_dias[i]['@attributes'].fecha).getDay()].substr(0,3);
      this.weatherProxDias[i].estadoDelCielo = this.comoEstaElCielo(array.proximos_dias[i].estado_cielo);
      this.weatherProxDias[i].temperaturaMin = array.proximos_dias[i].temperatura.minima;
      this.weatherProxDias[i].temperaturaMax = array.proximos_dias[i].temperatura.maxima;
    }
  }

  /* Creamos una función para determinar la imagen de fondo en función de la breve descripción en tiempo real que nos aporta la Api, y del momento del día. Por ejemplo, si está despejado y es de día saldrá una imagen del cielo despejado con el sol, y si es de noche saldrá una imagen del cielo despejado con la luna. Además de la imagen de fondo, aprovechamos estas condiciones para establecer el icono que tendrá el día de 'hoy'. */
  imagenFondo() : void{
    if ( (this.weatherData.descripcion.includes('Poco nuboso') || this.weatherData.descripcion.includes('Despejado') || this.weatherData.descripcion.includes('despejado')) && this.diaNoche != 'noche') {
      this.imagen   = this.imagenes[0].src
      this.iconoHoy = this.imagenes[0].icono
    }else if((this.weatherData.descripcion.includes('Poco nuboso') || this.weatherData.descripcion.includes('Despejado') || this.weatherData.descripcion.includes('despejado')) && this.diaNoche === 'noche'){
      this.imagen   = this.imagenes[1].src
      this.iconoHoy = this.imagenes[0].icono
    }else if((this.weatherData.descripcion.includes('lluvia') || this.weatherData.descripcion.includes('tormenta')) && this.diaNoche != 'noche'){
      this.imagen   = this.imagenes[2].src
      this.iconoHoy = this.imagenes[2].icono
    }else if((this.weatherData.descripcion.includes('lluvia') || this.weatherData.descripcion.includes('tormenta')) && this.diaNoche === 'noche'){
      this.imagen   = this.imagenes[3].src
      this.iconoHoy = this.imagenes[2].icono
    }else if((this.weatherData.descripcion.includes('Nuboso') || this.weatherData.descripcion.includes('nubosos') || this.weatherData.descripcion.includes('Nubes')) && this.diaNoche != 'noche'){
      this.imagen   = this.imagenes[6].src
      this.iconoHoy = this.imagenes[6].icono
    }else if((this.weatherData.descripcion.includes('Nuboso') || this.weatherData.descripcion.includes('nubosos') || this.weatherData.descripcion.includes('Nubes')) && this.diaNoche === 'noche'){
      this.imagen   = this.imagenes[7].src
      this.iconoHoy = this.imagenes[7].icono
    }else if(this.weatherData.descripcion.includes('Muy nuboso') || this.weatherData.descripcion.includes('Cubierto')){
      this.imagen   = this.imagenes[7].src
      this.iconoHoy = this.imagenes[7].icono
    }else if(this.weatherData.descripcion.includes('Niebla') || this.weatherData.descripcion.includes('Bruma')){
      this.imagen   = this.imagenes[4].src
      this.iconoHoy = this.imagenes[4].icono
    }else if(this.weatherData.descripcion.includes('Nieve')){
      this.imagen   = this.imagenes[5].src
      this.iconoHoy = this.imagenes[5].icono
    }
  }
  /* Creamos una función para determinar qué icono tendrán los 'próximos días' en función del estado del cielo. */
  imagenProxDias() : void{
    for (let i = 0; i < this.weatherProxDias.length; i++) {
      if ( this.weatherProxDias[i].estadoDelCielo === 'despejado') {
        this.weatherProxDias[i].icono = this.imagenes[0].icono
      }else if(this.weatherProxDias[i].estadoDelCielo === 'lluvia'){
        this.weatherProxDias[i].icono = this.imagenes[2].icono
      }else if(this.weatherProxDias[i].estadoDelCielo === 'nuboso'){
        this.weatherProxDias[i].icono = this.imagenes[4].icono
      }else if(this.weatherProxDias[i].estadoDelCielo === 'poco nuboso'){
        this.weatherProxDias[i].icono = this.imagenes[6].icono
      }else if(this.weatherProxDias[i].estadoDelCielo === 'nieve'){
        this.weatherProxDias[i].icono = this.imagenes[5].icono
      }
    }
  }

  constructor(
    private weather        : WeatherService,
    private activatedRoute : ActivatedRoute
  ){}

  /* Al iniciar el componente nos suscribimos a los datos de la Api llamando a la url que hemos determinado en el servicio.
  Para suscribirnos a la url exacta que pertenezca al municipio al que hemos hecho click, recogemos el id de la provincia y el id del municipio que le hemos pasado por url mediante routing. Estos serán los parámetros que le pasaremos a la función getWeather() para suscribirnos.
  
  La Api tiene un pequeño error, y el id del municipio nos lo da seguido de seis ceros (como se ve en la url). Sin embargo, el id que pide la Api para acceder a los datos del municipio no contiene estos ceros. Por esa razón, le hacemos un sencillo slice para quitarle los últimos seis numeros, que son los seis ceros, y así quedarnos con el id auténtico del municipio.
  
  Finalmente recogemos los datos que necesitamos y llamamos a las funciones que hemos creado.*/
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({idProv, idMunicipio}) => {
      this.weather.getWeather(idProv, idMunicipio.slice(0, -6)).subscribe((data : any) => {
        this.weatherData.municipio         = data.municipio.NOMBRE
        this.weatherData.provincia         = data.municipio.NOMBRE_PROVINCIA
        this.weatherData.temperaturaActual = data.temperatura_actual
        this.weatherData.viento            = data.viento
        this.weatherData.temperaturaMin    = data.temperaturas.min
        this.weatherData.temperaturaMax    = data.temperaturas.max
        this.weatherData.humedad           = data.humedad
        this.weatherData.ocaso             = data.pronostico.hoy['@attributes'].ocaso
        this.weatherData.descripcion       = data.stateSky.description
        this.weatherData.estadoDelCielo    = this.comoEstaElCielo(data.pronostico.hoy.estado_cielo)
        this.cieloProxDias(data)
        this.estadoDia()
        this.imagenFondo()
        this.imagenProxDias()
      })
    })
  }
}