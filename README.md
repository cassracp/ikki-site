# IKKI: Mokanbo Tan - Ficha de Personagem

Aplicação web moderna para gerenciamento de fichas de personagem do sistema **IKKI: Mokanbo Tan**. Construída com foco em portabilidade, rapidez e estética imersiva.

## 🎴 Estética: Dirty Paper

A ficha utiliza um design personalizado apelidado de "Dirty Paper", que emula a aparência de um papel de pergaminho ou relatório militar antigo, com texturas SVG e tipografia clássica, mantendo a responsividade moderna.

## 🛠️ Tecnologias

- **Core:** React 18 + Vite
- **Linguagem:** TypeScript
- **Estado Global:** [Zustand](https://github.com/pmndrs/zustand)
- **Persistência:** LocalStorage (Persistência automática no navegador)
- **Estilização:** CSS Modules + Variáveis CSS Globais

## 🚀 Funcionalidades

- **Cálculo Automático de Mentsu (Vontade):** Ajusta dinamicamente com base em modificadores e carga.
- **Gerenciamento de Hara (Fôlego):** Controle de pontos e registro de cicatrizes.
- **Inventário Dinâmico:**
  - Cálculo automático de peso/slots.
  - Alerta visual de **SOBRECARGA** (Penalty).
  - Redução automática de deslocamento quando sobrecarregado.
- **Retrato:** Carregamento de imagem via URL.
- **Persistência:** Seus dados são salvos automaticamente no navegador após cada edição.

## 📦 Como rodar o projeto

### Pré-requisitos

- Node.js (v18 ou superior)
- npm ou yarn

### Instalação

1. Clone o repositório ou baixe os arquivos.
2. Na pasta raiz, instale as dependências:
   ```bash
   npm install
   ```

### Desenvolvimento

Para iniciar o servidor de desenvolvimento:

```bash
npm run dev
```

### Build

Para gerar a versão de produção (estática):

```bash
npm run build
```

Os arquivos serão gerados na pasta `/dist`.

## 📂 Estrutura do Projeto

- `src/components`: Componentes modulares (Header, Stats, Inventory, Bottom).
- `src/store`: Store global com Zustand.
- `src/types`: Interfaces TypeScript.
- `src/Layout`: Componentes de estrutura (Wrapper de textura).
- `legacy_mvp/`: Versão original em HTML/JS puro para referência histórica.

---

_Este projeto é uma ferramenta de auxilio para jogadores e mestre do sistema IKKI._
