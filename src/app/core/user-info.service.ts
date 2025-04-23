import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UserInfoService {
  private _nomeUsuario = '';
  private _admin = false;

  setDados(nome: string, admin: boolean) {
    this._nomeUsuario = nome;
    this._admin = admin;
  }

  get nomeUsuario(): string {
    return this._nomeUsuario;
  }

  get isAdmin(): boolean {
    return this._admin;
  }
}