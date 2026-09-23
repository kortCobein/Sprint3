import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '../services/auth';
import { Session } from '../services/session';
import { Conectividad } from '../services/conectividad';

@Component({
  imports: [FormsModule],
  selector: 'app-login',
  styleUrl: './login.css',
  templateUrl: './login.html',
})
export class Login {
  private auth = inject(Auth);
  private session = inject(Session);
  private router = inject(Router);
  private conectividad = inject(Conectividad);

  usuario = '';
  password = '';
  mensaje = '';
  error = false;

  iniciarSesion() {
    this.mensaje = '';
    this.error = false;

    // Comprobar conexión a Internet
    if (!this.conectividad.tieneConexion()) {
      this.mensaje = 'No hay conexión a Internet.';
      this.error = true;
      return;
    }

    // Validar que se hayan ingresado las credenciales
    if (!this.usuario || !this.password) {
      this.mensaje = 'Ingresa tu usuario y contraseña.';
      this.error = true;
      return;
    }

    // Iniciar sesión
    this.auth.iniciarSesion(this.usuario, this.password).subscribe({
      next: (respuesta) => {
        console.log('Token recibido:', respuesta.token);

        // Obtener información de los usuarios
        this.auth.obtenerUsuarios().subscribe({
          next: (usuarios) => {
            const usuarioEncontrado = usuarios.find(
              (usuario) => usuario.username === this.usuario
            );

            if (!usuarioEncontrado) {
              this.mensaje = 'No se encontró la información del usuario.';
              this.error = true;
              return;
            }

            console.log('Usuario encontrado:', usuarioEncontrado);

            // Asignar rol según el ID del usuario
            let rol = '';

            if (usuarioEncontrado.id === 1 || usuarioEncontrado.id === 2) {
              rol = 'Administrador';
            } else if (usuarioEncontrado.id === 3) {
              rol = 'Auditor';
            } else {
              rol = 'Cliente';
            }

            console.log('ID del usuario:', usuarioEncontrado.id);
            console.log('Rol asignado:', rol);

            // Guardar la sesión
            this.session.guardarSesion(
              respuesta.token,
              usuarioEncontrado.id,
              rol
            );

            console.log('Sesión guardada correctamente');

            // Navegar según el rol
            if (rol === 'Administrador') {
              this.router.navigate(['/administrador']);
            } else if (rol === 'Auditor') {
              this.router.navigate(['/auditor']);
            } else if (rol === 'Cliente') {
              this.router.navigate(['/cliente']);
            }

            this.mensaje = `Inicio de sesión exitoso. Rol: ${rol}`;
            this.error = false;
          },

          error: (error) => {
            console.error('Error al obtener usuario:', error);

            this.mensaje =
              'No se pudo obtener la información del usuario.';
            this.error = true;
          },
        });
      },

      error: (error) => {
        console.error('Error de inicio de sesión:', error);

        this.mensaje = 'Usuario o contraseña inválidos.';
        this.error = true;
      },
    });
  }
}