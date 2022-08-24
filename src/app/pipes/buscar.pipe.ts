import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'buscar'
})
export class BuscarPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    
    let [lugar] = args
    let buscar = value.filter((municipio : any) => {
      return municipio.NOMBRE.toLowerCase().startsWith(lugar.toLowerCase())
    })
    if( lugar !== ''){
      return buscar; 
    }
  }

}
