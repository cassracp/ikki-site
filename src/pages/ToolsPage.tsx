import React, { useState } from "react";

const ITEM_TYPES = [
  "Katana",
  "Yari (Lança)",
  "Yumi (Arco)",
  "Armadura de Bambu",
  "Saco de Arroz",
  "Amuleto Budista",
  "Corda de Seda",
  "Garrafa de Sake",
  "Pergaminho Antigo",
  "Dente de Oni",
];

const ITEM_CONDITIONS = [
  "Enferrujado",
  "Novo em folha",
  "Manchado de Sangue",
  "Quebrado",
  "Sagrado",
  "Amaldiçoado",
  "Banal",
  "Ornamentado",
];

export const ToolsPage: React.FC = () => {
  const [loot, setLoot] = useState<string | null>(null);

  const generateLoot = () => {
    const item = ITEM_TYPES[Math.floor(Math.random() * ITEM_TYPES.length)];
    const condition =
      ITEM_CONDITIONS[Math.floor(Math.random() * ITEM_CONDITIONS.length)];
    setLoot(`${item} (${condition})`);
  };

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "40px auto",
        padding: "20px",
        backgroundColor: "#2c2c2c",
        border: "2px solid #8a1c1c",
        color: "#f0e6d2",
        textAlign: "center",
      }}
    >
      <h2
        style={{
          borderBottom: "1px solid #8a1c1c",
          paddingBottom: "10px",
          color: "#f0e6d2",
        }}
      >
        Gerador de Loot
      </h2>

      <div
        style={{
          margin: "40px 0",
          minHeight: "60px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "1.5rem",
          fontFamily: "monospace",
          border: "1px dashed #4a4a4a",
          padding: "20px",
        }}
      >
        {loot ? loot : "Clique abaixo para gerar..."}
      </div>

      <button
        onClick={generateLoot}
        style={{
          padding: "10px 20px",
          backgroundColor: "#8a1c1c",
          color: "#fff",
          border: "none",
          fontSize: "1rem",
          cursor: "pointer",
          fontWeight: "bold",
          textTransform: "uppercase",
        }}
      >
        Gerar Item
      </button>
    </div>
  );
};
