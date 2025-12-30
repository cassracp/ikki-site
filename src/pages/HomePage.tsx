import React from "react";
import { Link } from "react-router-dom";

export const HomePage: React.FC = () => {
  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "0 auto",
        padding: "40px 20px",
        color: "#f0e6d2",
        textAlign: "center",
      }}
    >
      <h1
        style={{
          fontSize: "8rem",
          margin: "0 0 10px 0",
          color: "#8a1c1c",
          fontFamily: "var(--font-japanese)",
          fontWeight: "normal",
          lineHeight: "1",
          textShadow: "4px 4px 0 #1a1a1a",
          borderBottom: "none",
        }}
      >
        一揆
      </h1>
      <h2
        style={{
          marginBottom: "40px",
          fontFamily: "var(--font-japanese)",
          fontSize: "3rem",
          color: "#d4c5a9",
          fontWeight: "normal",
          borderBottom: "none",
        }}
      >
        盲官坊 譚
      </h2>
      <p
        style={{
          fontSize: "1.2rem",
          lineHeight: "1.8",
          marginBottom: "40px",
          fontFamily: "var(--font-mono)",
        }}
      >
        Bem-vindo à ferramenta digital para{" "}
        <span
          style={{
            fontFamily: "var(--font-japanese)",
            color: "#8a1c1c",
            fontSize: "1.6rem",
            textShadow: "1px 1px 0 #1a1a1a",
            fontWeight: "normal",
          }}
        >
          IKKI: MOKANBO TAN
        </span>
        . Aqui você pode gerenciar sua ficha de personagem, consultar as regras
        e gerar recursos para sua campanha.
      </p>

      <div
        style={{
          display: "flex",
          gap: "20px",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        <Link
          to="/sheet"
          style={{
            padding: "15px 30px",
            backgroundColor: "#8a1c1c",
            color: "#f0e6d2",
            textDecoration: "none",
            fontWeight: "bold",
            fontSize: "1.2rem",
            border: "2px solid #1a1a1a",
            boxShadow: "4px 4px 0 #1a1a1a",
          }}
        >
          ABRIR FICHA
        </Link>
        <Link
          to="/srd"
          style={{
            padding: "15px 30px",
            backgroundColor: "#d4c5a9",
            color: "#1a1a1a",
            textDecoration: "none",
            fontWeight: "bold",
            fontSize: "1.2rem",
            border: "2px solid #1a1a1a",
            boxShadow: "4px 4px 0 #1a1a1a",
          }}
        >
          LER REGRAS
        </Link>
      </div>
    </div>
  );
};
