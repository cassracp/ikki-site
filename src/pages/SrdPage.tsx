import React from "react";
import ReactMarkdown from "react-markdown";

const srdContent = `
# Regras Básicas (SRD)

**IKKI** é um jogo sobre honra, sobrevivência e revolta.

## Testes

Role **1d6**.
- **1-3**: Falha (Consequência).
- **4-5**: Sucesso Parcial (Custo).
- **6**: Sucesso Total.

## Atributos

- **Força**: Quebrar, levantar, intimidar.
- **Destreza**: Mover-se, esconder-se, atirar.
- **Espírito**: Resistir, perceber, invocar.

Use seus atributos para modificar a rolagem ou determinar a eficácia.
`;

export const SrdPage: React.FC = () => {
  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "0 auto",
        padding: "20px",
        backgroundColor: "#f0e6d2",
        color: "#1a1a1a",
        minHeight: "80vh",
        border: "1px solid #d4c5a9",
        boxShadow: "0 0 20px rgba(0,0,0,0.5)",
      }}
    >
      <div className="markdown-body" style={{ fontFamily: "serif" }}>
        <ReactMarkdown>{srdContent}</ReactMarkdown>
      </div>
    </div>
  );
};
