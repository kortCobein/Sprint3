import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Session } from '../services/session';

@Component({
  imports: [],
  selector: 'app-cliente',
  styleUrl: './cliente.css',
  templateUrl: './cliente.html',
})
export class Cliente {
  private session = inject(Session);
  private router = inject(Router);

  cerrarSesion() {
    this.session.cerrarSesion();
    this.router.navigate(['/']);
  }
}
