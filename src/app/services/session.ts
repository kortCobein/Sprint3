import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class Session {
  private platformId = inject(PLATFORM_ID);

  private getStorage(): Storage | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage;
    }

    return null;
  }

  guardarSesion(token: string, idUsuario: number, rol: string) {
    const storage = this.getStorage();

    if (!storage) {
      return;
    }

    storage.setItem('token', token);
    storage.setItem('idUsuario', idUsuario.toString());
    storage.setItem('rol', rol);
  }

  obtenerToken(): string | null {
    const storage = this.getStorage();

    return storage ? storage.getItem('token') : null;
  }

  obtenerIdUsuario(): number | null {
    const storage = this.getStorage();

    if (!storage) {
      return null;
    }

    const id = storage.getItem('idUsuario');

    return id ? Number(id) : null;
  }

  obtenerRol(): string | null {
    const storage = this.getStorage();

    return storage ? storage.getItem('rol') : null;
  }

  cerrarSesion() {
    const storage = this.getStorage();

    if (!storage) {
      return;
    }

    storage.removeItem('token');
    storage.removeItem('idUsuario');
    storage.removeItem('rol');
    storage.removeItem('carrito');
  }
}
