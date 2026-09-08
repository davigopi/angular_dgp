export interface Tarefa {
  id: string;
  titulo: string;
  concluida: boolean;
  prioridade: 'Baixa' | 'Média' | 'Alta';
  dataCriacao: string;
}
