import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Session {

  guardarSesion(token: string, idUsuario: number, rol: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('idUsuario', idUsuario.toString());
    localStorage.setItem('rol', rol);
  }

  obtenerToken(): string | null {
    return localStorage.getItem('token');
  }

  obtenerIdUsuario(): number | null {
    const id = localStorage.getItem('idUsuario');

    return id ? Number(id) : null;
  }

  obtenerRol(): string | null {
    return localStorage.getItem('rol');
  }

  cerrarSesion() {
    localStorage.removeItem('token');
    localStorage.removeItem('idUsuario');
    localStorage.removeItem('rol');
  }
}