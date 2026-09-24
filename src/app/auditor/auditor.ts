import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Session } from '../services/session';

@Component({
  imports: [],
  selector: 'app-auditor',
  styleUrl: './auditor.css',
  templateUrl: './auditor.html',
})
export class Auditor {
  private session = inject(Session);
  private router = inject(Router);

  cerrarSesion() {
    this.session.cerrarSesion();
    this.router.navigate(['/']);
  }
}
