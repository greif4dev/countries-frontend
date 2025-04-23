import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pais } from '../shared/models/pais.model';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class PaisService {
  private api = environment.apiUrl + '/pais';

  constructor(private http: HttpClient) { }

  listar(): Observable<Pais[]> {
    return this.http.get<Pais[]>(`${this.api}/listar`);
  }

  excluir(id: number): Observable<boolean> {
    return this.http.get<boolean>(`${this.api}/excluir`, {
      params: { id }
    });
  }

  salvar(pais: Pais): Observable<Pais> {
    return this.http.post<Pais>(`${this.api}/salvar`, pais);
  }
}