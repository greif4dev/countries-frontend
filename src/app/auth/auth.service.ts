import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UsuarioAutenticado } from '../shared/models/usuario-autenticado.model';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private api = environment.apiUrl;

  constructor(private http: HttpClient) {}

  login(login: string, senha: string): Observable<UsuarioAutenticado> {
    return this.http.post<UsuarioAutenticado>(`${this.api}/usuario/autenticar`, null, {
      params: { login, senha }
    });
  }

  renovarToken(token: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.api}/usuario/renovar-ticket`, {
      params: { token }
    });
  }
}