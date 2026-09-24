import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Session } from '../services/session';

@Component({
  imports: [],
  selector: 'app-administrador',
  styleUrl: './administrador.css',
  templateUrl: './administrador.html',
})
export class Administrador {
  private session = inject(Session);
  private router = inject(Router);

  cerrarSesion() {
    this.session.cerrarSesion();
    this.router.navigate(['/']);
  }
}
