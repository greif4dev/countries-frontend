import { Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'paises',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () => import('./auth/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'paises',
    loadComponent: () => import('./paises/paises.component').then(m => m.PaisesComponent),
    canActivate: [AuthGuard]
  }
];