import { Component } from '@angular/core';
import { GifsService } from '../../gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {

  constructor(private gifServices: GifsService){
  }

  get historial(){
    return this.gifServices.historial;
  }

  buscar(termino: string){
    this.gifServices.buscarGifs(termino);
  }
}
