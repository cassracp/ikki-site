import React from "react";
import { useGameStore } from "../store/useGameStore";

export const HeaderSection: React.FC = () => {
  const { character, updateCharacterMeta } = useGameStore();
  const { meta } = character;

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "3fr 1fr 1fr 1fr",
        gap: "15px",
        marginBottom: "20px",
        position: "relative",
        zIndex: 1,
      }}
    >
      <div className="input-group">
        <label>Nome do Personagem</label>
        <input
          type="text"
          placeholder="Nome do Ronin/Refugiado"
          value={meta.name}
          onChange={(e) => updateCharacterMeta({ name: e.target.value })}
        />
      </div>
      <div className="input-group">
        <label>Sexo/Pronome</label>
        <input
          type="text"
          value={meta.sex}
          onChange={(e) => updateCharacterMeta({ sex: e.target.value })}
        />
      </div>
      <div className="input-group">
        <label>Nível</label>
        <input
          type="number"
          value={meta.level}
          min={1}
          onChange={(e) =>
            updateCharacterMeta({ level: Number(e.target.value) })
          }
          style={{ fontWeight: "bold" }}
        />
      </div>
      <div className="input-group">
        <label>Giri (Reputação)</label>
        <input
          type="text"
          placeholder="0/100"
          value={meta.giri}
          onChange={(e) => updateCharacterMeta({ giri: e.target.value })}
        />
      </div>
    </div>
  );
};
