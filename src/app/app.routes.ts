import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Administrador } from './administrador/administrador';
import { Auditor } from './auditor/auditor';
import { Cliente } from './cliente/cliente';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
  {
    path: '',
    component: Login,
  },
  {
    path: 'administrador',
    component: Administrador,
    canActivate: [authGuard],
  },
  {
    path: 'auditor',
    component: Auditor,
    canActivate: [authGuard],
  },
  {
    path: 'cliente',
    component: Cliente,
    canActivate: [authGuard],
  },
];
