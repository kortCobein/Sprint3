import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Administrador } from './administrador/administrador';
import { Auditor } from './auditor/auditor';
import { Cliente } from './cliente/cliente';

export const routes: Routes = [
  {
    path: '',
    component: Login
  },
  {
    path: 'administrador',
    component: Administrador
  },
  {
    path: 'auditor',
    component: Auditor
  },
  {
    path: 'cliente',
    component: Cliente
  }
];