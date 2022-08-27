import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGifsResponse, Gif } from '../interfaces/gifs.interfaces';

@Injectable({
  providedIn: 'root' //root significa que no importa en la parte de la app donde este, va a ser un solo servicio
})
export class GifsService {

  private apiKey : string = 'ankKYxyp5QnvamOEjXQxVS2hkYhb8IHc';//apy de Ghipy
  private _historial: string[] = [];
  public resultados: Gif[] = [];
  private servicioUrl : string = 'http://api.giphy.com/v1/gifs'

//cambiar Any por su tipo correspondiente
  get historial() {
    return [...this._historial];
  }

  constructor(private http: HttpClient){
    //Solo se ejecuta una vez, al inicio cuando se llama el servicio ! significa que confie en mi
      this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
      this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [];
  }
  
  buscarGifs(query: string){
    query = query.trim().toLocaleLowerCase();
    if (!this._historial.includes(query)) {
      this._historial.unshift(query);
      this._historial = this._historial.splice(0,10); // corta el arreglo principal   

      localStorage.setItem('historial', JSON.stringify(this.historial));
    }

    const params = new HttpParams().set('api_key', this.apiKey)
    .set('limit', '10')
    .set('q', query);

    console.log(params);
    this.http.get<SearchGifsResponse>(`${this.servicioUrl}/search`, {params})
    .subscribe((resp) =>{
      this.resultados = resp.data;
      localStorage.setItem('resultados', JSON.stringify(this.resultados));
    });
   }
}
