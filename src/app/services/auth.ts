import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface LoginResponse {
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private http = inject(HttpClient);

  private apiUrl = 'https://fakestoreapi.com';

  iniciarSesion(username: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(
      `${this.apiUrl}/auth/login`,
      {
        username: username,
        password: password,
      }
    );
  }
  obtenerUsuarios(): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}/users`);
}
}
