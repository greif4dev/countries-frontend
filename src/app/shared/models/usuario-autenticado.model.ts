export interface UsuarioAutenticado {
    login: string;
    nome: string;
    token: string;
    administrador: boolean;
    autenticado: boolean;
  }