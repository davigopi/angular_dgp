---
## CÓDIGO angular_dgp
---
Aplicação web para gerenciamento avançado de tarefas com priorização, filtros dinâmicos e persistência local de dados.

### Problema de Negócio
Necessidade de uma interface leve e intuitiva para controle e acompanhamento de tarefas operacionais do dia a dia, com cálculo automático de progresso, ordenação por prioridade e armazenamento local sem dependência de backend imediato.

### Tecnologias Utilizadas
- **Linguagem:** TypeScript / HTML5 / CSS3
- **Frameworks/Libs:** Angular 17+ (Standalone Components) / RxJS / Angular FormsModule
- **Banco de Dados:** LocalStorage (Navegador)

### Funcionalidades Principais
- [x] Cadastro e remoção de tarefas com definição de prioridades (Baixa, Média, Alta)
- [x] Filtros dinâmicos por status (Todas, Pendentes, Concluídas)
- [x] Dashboard visual de progresso percentual em tempo real
- [x] Persistência automática no LocalStorage do navegador


---

## Sumário

1. [ESTRUTURA DO PROJETO](#1-estrutura-do-projeto)
2. [COMO UTILIZAR E EXECUTAR](#2-como-utilizar-e-executar)
3. [PADRÕES E REGRAS](#3-padrões-e-regras)
4. [INSTALAR E ATUALIZAÇÕES](#5-instalar-e-atualizações)
5. [COMO USAR NOS SEUS PROJETOS](#6-como-usar-nos-seus-projetos)


---

## 1. ESTRUTURA DO PROJETO

Estrutura principal do projeto Angular:

Crie uma pasta com o nome `angular_dgp` para centralizar a biblioteca e o comando CLI responsável pelas automações e padronizações dos projetos Angular.

A estrutura deve utilizar tecnologias do ecossistema Node.js/TypeScript.

Estrutura sugerida:

```bash

angula-teste/

├── src/

│ ├── app/

│ │ ├── models/

│ │ │ └── tarefa.model.ts

│ │ ├── app.ts

│ │ └── app.html

│ ├── index.ts

│ ├── commands/

│ ├── models/

│ └── utils/

│

├── package.json

├── tsconfig.json

├── .editorconfig

└── CHANGELOG.md

```

**Arquivos principais alterados para o funcionamento da aplicação:**

- `src/app/app.ts` → lógica principal do componente da aplicação.

- `src/app/app.html` → estrutura HTML e apresentação da aplicação.

- `src/app/models/tarefa.model.ts` → definição do modelo utilizado para representar uma tarefa.


**Descrição dos principais arquivos:**

- `src/index.ts` → ponto de entrada da biblioteca ou CLI.

- `src/commands/` → comandos e funcionalidades disponibilizados pelo CLI.

- `src/models/` → modelos e estruturas utilizadas pela ferramenta.

- `src/utils/` → funções auxiliares e utilitários.

- `package.json` → configuração do projeto Node.js/TypeScript, incluindo nome, versão, scripts e dependências.

- `tsconfig.json` → configurações do compilador TypeScript.

- `.editorconfig` → configurações de padronização e formatação do código.

- `CHANGELOG.md` → histórico de alterações e versões do projeto.

> **Observação:** a estrutura acima deve ser ajustada de acordo com a implementação real do `angular_dgp`.
---

## 2. COMO UTILIZAR E EXECUTAR

### A) Instalar Dependências

Se o repositório acabou de ser clonado, instale as dependências do projeto:

```bash

npm install

```

### B) Servidor de Desenvolvimento Local

Para iniciar a aplicação em modo de desenvolvimento com recarregamento automático (*Live Reload*):

```bash

npx ng serve --open

```

```bash
npx ng serve --port 4200 --open 

```

*> O parâmetro* *`--open`* *abrirá automaticamente a aplicação no seu navegador padrão.*

A aplicação estará disponível, por padrão, no endereço:

`[http://localhost:4200/\`](http://localhost:4200/)

### C) Compilar para Produção (Build)

Para gerar os arquivos estáticos otimizados para produção na pasta `dist/`:

```bash

npx ng build

```

Os arquivos compilados serão gerados na pasta `dist/`.

---

## 3. PADRÕES E REGRAS

- Execução dos comandos do Angular utilizando `npx`, sem necessidade de instalação global do Angular CLI.

- Instalação e gerenciamento das dependências utilizando `npm`.

- Formatação do código utilizando espaçamento de 2 espaços, conforme definido no arquivo `.editorconfig`.

- Código TypeScript seguindo os padrões definidos pelo projeto Angular.

- Manter os componentes, modelos e demais arquivos organizados dentro da estrutura `src/app/`.


---------------------------------------------------------

## 4. INSTALAR E ATUALIZAÇÕES

---------------------------------------------------------

Como o `angular_dgp` é uma ferramenta baseada em Node.js/TypeScript, sua instalação e atualização devem utilizar o `npm`.

### A) INSTALAR AS DEPENDÊNCIAS

Dentro do diretório do projeto:

```bash
npm install

```

### B) GERAR O BUILD DA FERRAMENTA

Caso o projeto possua um script de build configurado no `package.json`:

```bash
npm run build

```

### C) ATUALIZAR AS DEPENDÊNCIAS

Para verificar e atualizar as dependências permitidas pelo projeto:

```bash
npm update

```

### D) ATUALIZAR UMA DEPENDÊNCIA ESPECÍFICA

Caso seja necessário atualizar uma dependência específica:

```bash
npm install nome-do-pacote@latest

```

> **Importante:** os comandos exatos para instalação, publicação e execução do `angular_dgp` dependem da configuração definida no `package.json`.

---------------------------------------------------------

## 5. COMO USAR NOS SEUS PROJETOS

---------------------------------------------------------

O `angular_dgp` deverá ser utilizado para centralizar e padronizar funcionalidades que possam ser reaproveitadas em diferentes projetos Angular.

### A) Instalação no projeto Angular

Dentro da pasta do projeto Angular:

```bash

npm install angular_dgp

```

Caso a ferramenta seja utilizada diretamente a partir de um repositório local ou remoto, o método de instalação deverá ser definido de acordo com a configuração do `package.json`.

### B) Utilização através do CLI

Caso o `angular_dgp` disponibilize um comando CLI configurado no `package.json`, sua execução poderá ser feita através do `npx`:

```bash

npx angular_dgp

```

### C) Utilização através de scripts do projeto

Também é possível disponibilizar comandos através do `package.json` do projeto Angular:

```json
{
  "scripts": {
    "dgp": "angular_dgp"
  }
}

```

---------------------------------------------------------
