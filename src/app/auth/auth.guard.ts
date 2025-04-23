import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { getTokenLocal } from '../shared/utils/storage.util';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = getTokenLocal();
    if (token) {
      console.log('Token presente?', !!getTokenLocal());
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}