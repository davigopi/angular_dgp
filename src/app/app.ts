import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tarefa } from './models/tarefa.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  titulo: string = 'Gerenciador Avançado de Tarefas';

  // Form de adição
  novoTitulo: string = '';
  novaPrioridade: 'Baixa' | 'Média' | 'Alta' = 'Média';

  // Estado e Filtro
  filtroAtual: 'todas' | 'pendentes' | 'concluidas' = 'todas';
  tarefas: Tarefa[] = [];

  ngOnInit(): void {
    this.carregarTarefas();
  }

  // Getters computados
  get tarefasFiltradas(): Tarefa[] {
    if (this.filtroAtual === 'pendentes') {
      return this.tarefas.filter(t => !t.concluida);
    }
    if (this.filtroAtual === 'concluidas') {
      return this.tarefas.filter(t => t.concluida);
    }
    return this.tarefas;
  }

  get totalConcluidas(): number {
    return this.tarefas.filter(t => t.concluida).length;
  }

  get percentualConcluido(): number {
    if (this.tarefas.length === 0) return 0;
    return Math.round((this.totalConcluidas / this.tarefas.length) * 100);
  }

  // Ações
  adicionarTarefa(): void {
    if (this.novoTitulo.trim() === '') return;

    const nova: Tarefa = {
      id: crypto.randomUUID(),
      titulo: this.novoTitulo.trim(),
      concluida: false,
      prioridade: this.novaPrioridade,
      dataCriacao: new Date().toLocaleDateString('pt-BR')
    };

    this.tarefas.unshift(nova);
    this.novoTitulo = '';
    this.novaPrioridade = 'Média';
    this.salvarTarefas();
  }

  alternarStatus(id: string): void {
    const tarefa = this.tarefas.find(t => t.id === id);
    if (tarefa) {
      tarefa.concluida = !tarefa.concluida;
      this.salvarTarefas();
    }
  }

  removerTarefa(id: string): void {
    this.tarefas = this.tarefas.filter(t => t.id !== id);
    this.salvarTarefas();
  }

  limparConcluidas(): void {
    this.tarefas = this.tarefas.filter(t => !t.concluida);
    this.salvarTarefas();
  }

  private salvarTarefas(): void {
    try {
      localStorage.setItem('tarefas_dgp_v2', JSON.stringify(this.tarefas));
    } catch (e) {
      console.error('Erro ao salvar no localStorage:', e);
    }
  }

  private carregarTarefas(): void {
    try {
      const salvas = localStorage.getItem('tarefas_dgp_v2');
      if (salvas) {
        this.tarefas = JSON.parse(salvas);
      } else {
        this.tarefas = [
          {
            id: crypto.randomUUID(),
            titulo: 'Aprender Angular Avançado',
            concluida: false,
            prioridade: 'Alta',
            dataCriacao: new Date().toLocaleDateString('pt-BR')
          },
          {
            id: crypto.randomUUID(),
            titulo: 'Construir API em Python',
            concluida: true,
            prioridade: 'Média',
            dataCriacao: new Date().toLocaleDateString('pt-BR')
          }
        ];
        this.salvarTarefas();
      }
    } catch (e) {
      console.error('Erro ao carregar do localStorage:', e);
    }
  }
}
