# Especificação Técnica: IKKI System (Scalable Edition)

## 1. Stack Tecnológica

- **Core:** React 18 + Vite.
- **Linguagem:** TypeScript (Strict Mode).
- **State Management:** Zustand (Store global para Personagem e UI).
- **Build Target:** Static Web App (SPA) - Hospedável em GitHub Pages.

## 2. Estrutura de Diretórios (Domain Driven Design Lite)

/src
/assets # Imagens estáticas (texturas de papel, ícones)
/components # Componentes React
/Atoms # Inputs, Labels, Botões genéricos
/Molecules # InventoryRow, StatBox
/Organisms # Header, InventorySection, PortraitEditor
/Templates # CharacterSheetLayout
/data # "Banco de Dados" estático (items.json, rules.json)
/hooks # Lógica reutilizável (usePersistState, useImageProcessor)
/store # Zustand Stores (characterStore.ts)
/types # Interfaces TypeScript (ICharacter, IItem, IStats)
/utils # Helpers (calculadora de carga, compressor de imagem)

## 3. Definição de Tipos (Crucial para Escalabilidade)

Interface `ICharacter`:

- `stats`: { mentsu: number, hara: { current: number, max: number }, ... }
- `inventory`: Array<IInventorySlot>
- `meta`: { name: string, level: number, image: IPortrait }

Interface `IInventorySlot`:

- `id`: string (uuid)
- `itemRef`: string | null (referência ao DB de itens)
- `customName`: string (override ou item único)
- `quantity`: number
- `isOverloaded`: boolean (computado)

## 4. Funcionalidades Avançadas

- **Service Layer Pattern:** Criar `ItemService.ts`. Inicialmente ele busca de um array local. No futuro, ele pode ser adaptado para SQLite (WASM) ou API Rest.
- **Image Processing Worker:** O processamento da imagem (resize/webp) deve ser isolado para não travar a UI principal.
- **Roteamento:** Preparar `React Router` caso queira criar múltiplas páginas (ex: Lista de Personagens, Editor de Itens).

## 5. Migração do CSS "Dirty Paper"

- Manter as variáveis CSS (`:root`) globais.
- Criar Wrapper Component `PaperContainer` que aplica a textura SVG de fundo e bordas.
