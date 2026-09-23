import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Conectividad {

  tieneConexion(): boolean {
    return navigator.onLine;
  }
}