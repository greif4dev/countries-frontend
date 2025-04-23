import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserInfoService } from '../user-info.service';
import { removerTokenLocal } from '../../shared/utils/storage.util';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  template: `
    <nav class="p-4 shadow-md bg-white flex justify-between items-center">
      <span class="text-xl font-bold">Países</span>
      <div class="flex gap-4 items-center">
        <span class="italic">Olá, {{ userInfo.nomeUsuario }}</span>
        <button class="text-sm text-red-600" (click)="confirmarLogout()">Sair</button>
      </div>
    </nav>
  `,
  styles: []
})
export class HeaderComponent {
  constructor(
    public userInfo: UserInfoService,
    private router: Router
  ) {}

  confirmarLogout() {
    if (confirm('Deseja realmente sair?')) {
      removerTokenLocal();
      this.router.navigate(['/login']);
    }
  }
}