import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html'
})
export class BusquedaComponent {

  @ViewChild('txtBuscar') txtBuscar!: ElementRef<HTMLInputElement>;

  constructor(private gifsService: GifsService){

  }
  buscar(){
    const valorIngresado = this.txtBuscar.nativeElement.value;
    if(valorIngresado.trim().length === 0){
      return;
    }
    this.gifsService.buscarGifs(valorIngresado);
    this.txtBuscar.nativeElement.value = '';
    // Aqui ya es necesario crear un servicio especializado en almacenar todo
    // lo relacionado con los gifs
  }
}
