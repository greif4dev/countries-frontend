import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Pais } from '../shared/models/pais.model';
import { PaisService } from './pais.service';
import { UserInfoService } from '../core/user-info.service';
import { HeaderComponent } from '../core/header/header.component';

@Component({
  selector: 'app-paises',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HeaderComponent],
  templateUrl: './paises.component.html',
  styleUrls: ['./paises.component.scss']
})
export class PaisesComponent implements OnInit {
  paises: Pais[] = [];
  paisesFiltrados: Pais[] = [];
  paginaAtual: Pais[] = [];
  filtro = '';
  isAdmin = false;
  form: FormGroup | null = null;
  paisEditando: Pais | null = null;
  loading = false;
  mensagem = '';
  erro = '';
  pagina = 1;
  tamanhoPagina = 5;
  totalPaginas = 1;
  criterioOrdenacao: keyof Pais = 'nome';
  ascendente = true;

  constructor(
    private paisService: PaisService,
    private userInfo: UserInfoService,
    private fb: FormBuilder
  ) {
    this.isAdmin = userInfo.isAdmin;
  }

  ngOnInit(): void {
    this.carregarPaises();
  }

  carregarPaises() {
    this.loading = true;
    this.paisService.listar().subscribe({
      next: res => {
        this.paises = res;
        this.pesquisar();
        this.loading = false;
      },
      error: err => {
        this.erro = 'Erro ao carregar países.';
        this.loading = false;
      }
    });
  }

  pesquisar() {
    const texto = this.filtro.toLowerCase();
    this.paisesFiltrados = this.paises.filter(p => p.nome.toLowerCase().includes(texto));
    this.ordenar();
    this.pagina = 1;
    this.atualizarPagina();
  }

  ordenarPor(campo: keyof Pais) {
    if (this.criterioOrdenacao === campo) {
      this.ascendente = !this.ascendente;
    } else {
      this.criterioOrdenacao = campo;
      this.ascendente = true;
    }
    this.ordenar();
    this.atualizarPagina();
  }

  ordenar() {
    this.paisesFiltrados.sort((a, b) => {
      const valorA = a[this.criterioOrdenacao]?.toString().toLowerCase() || '';
      const valorB = b[this.criterioOrdenacao]?.toString().toLowerCase() || '';
      return this.ascendente ? valorA.localeCompare(valorB) : valorB.localeCompare(valorA);
    });
  }

  atualizarPagina() {
    const inicio = (this.pagina - 1) * this.tamanhoPagina;
    const fim = inicio + this.tamanhoPagina;
    this.totalPaginas = Math.ceil(this.paisesFiltrados.length / this.tamanhoPagina);
    this.paginaAtual = this.paisesFiltrados.slice(inicio, fim);
  }

  novoPais() {
    this.form = this.fb.group({
      id: [0],
      nome: ['', Validators.required],
      sigla: ['', [Validators.required, Validators.maxLength(2)]],
      gentilico: ['', Validators.required]
    });
    this.paisEditando = null;
    this.mensagem = '';
    this.erro = '';
  }

  editar(pais: Pais) {
    this.form = this.fb.group({
      id: [pais.id],
      nome: [pais.nome, Validators.required],
      sigla: [pais.sigla, [Validators.required, Validators.maxLength(2)]],
      gentilico: [pais.gentilico, Validators.required]
    });
    this.paisEditando = pais;
    this.mensagem = '';
    this.erro = '';
  }

  cancelar() {
    this.form = null;
    this.paisEditando = null;
    this.mensagem = '';
    this.erro = '';
  }

  salvar() {
    if (this.form?.valid) {
      this.loading = true;
      this.paisService.salvar(this.form.value).subscribe({
        next: () => {
          this.cancelar();
          this.carregarPaises();
          this.mensagem = 'País salvo com sucesso!';
          this.loading = false;
        },
        error: () => {
          this.erro = 'Erro ao salvar país.';
          this.loading = false;
        }
      });
    }
  }

  excluir(id: number) {
    if (confirm('Deseja excluir este país?')) {
      this.loading = true;
      this.paisService.excluir(id).subscribe({
        next: () => {
          this.carregarPaises();
          this.mensagem = 'País excluído com sucesso!';
          this.loading = false;
        },
        error: () => {
          this.erro = 'Erro ao excluir país.';
          this.loading = false;
        }
      });
    }
  }

  ngDoCheck(): void {
    this.atualizarPagina();
  }
}