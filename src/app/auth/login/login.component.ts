import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { UserInfoService } from '../../core/user-info.service';
import { salvarTokenLocal } from '../../shared/utils/storage.util';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="flex justify-center items-center h-screen bg-gray-100">
      <form (ngSubmit)="login()" class="bg-white p-6 rounded-xl shadow-md w-96">
        <h2 class="text-xl font-bold mb-4">Login</h2>
        <input [(ngModel)]="loginInput" name="login" placeholder="Login" class="w-full mb-3 p-2 border rounded" required>
        <input [(ngModel)]="senhaInput" name="senha" placeholder="Senha" type="password" class="w-full mb-3 p-2 border rounded" required>
        <button class="w-full bg-blue-600 text-white p-2 rounded" type="submit">Entrar</button>
        <p *ngIf="erro" class="text-red-600 mt-2">Login inválido</p>
      </form>
    </div>
  `,
  styles: []
})
export class LoginComponent {
  loginInput = '';
  senhaInput = '';
  erro = false;

  constructor(
    private authService: AuthService,
    private userInfo: UserInfoService,
    private router: Router
  ) {}

  login() {
    this.authService.login(this.loginInput, this.senhaInput).subscribe(res => {
      if (res.autenticado) {
        salvarTokenLocal(res.token);
        this.userInfo.setDados(res.nome, res.administrador);
        this.erro = false;
        this.router.navigate(['/paises']);
        console.log('Autenticado?', res.autenticado);
        console.log('Token:', res.token);
      } else {
        this.erro = true;
        console.log('Autenticado?', res.autenticado);
        console.log('Token:', res.token);
      }
    });
  }
}
