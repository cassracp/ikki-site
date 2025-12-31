import React from "react";
import { useGameStore, getNextLevelGiri } from "../store/useGameStore";

export const HeaderSection: React.FC = () => {
  const { character, updateCharacterMeta } = useGameStore();
  const { meta } = character;

  const nextLevelGiri = getNextLevelGiri(meta.level);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "3fr 1fr 1fr 1fr",
        gap: "15px",
        marginTop: "10px", // Puxa um pouco para baixo para alinhar
        marginBottom: "20px",
        position: "relative",
        zIndex: 1,
      }}
    >
      <div className="input-group">
        <label
          style={{
            minHeight: "2.5rem",
            display: "flex",
            alignItems: "flex-end",
          }}
        >
          Nome do Personagem
        </label>
        <input
          type="text"
          placeholder="Nome do Ronin/Refugiado"
          value={meta.name}
          onChange={(e) => updateCharacterMeta({ name: e.target.value })}
        />
      </div>
      <div className="input-group">
        <label
          style={{
            minHeight: "2.5rem",
            display: "flex",
            alignItems: "flex-end",
          }}
        >
          Gênero/Pronome
        </label>
        <input
          type="text"
          value={meta.sex}
          onChange={(e) => updateCharacterMeta({ sex: e.target.value })}
        />
      </div>
      <div className="input-group">
        <label
          style={{
            minHeight: "2.5rem",
            display: "flex",
            alignItems: "flex-end",
          }}
        >
          Nível
        </label>
        <input
          type="number"
          value={meta.level}
          min={1}
          max={10}
          onChange={(e) =>
            updateCharacterMeta({ level: Math.min(Number(e.target.value), 10) })
          }
          style={{ fontWeight: "bold" }}
        />
      </div>
      <div className="input-group">
        <label
          style={{
            minHeight: "2.5rem",
            display: "flex",
            alignItems: "flex-end",
          }}
        >
          Giri (Reputação)
        </label>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <input
            type="text"
            placeholder="0"
            value={meta.giri}
            onChange={(e) => updateCharacterMeta({ giri: e.target.value })}
            style={{ flex: 1, minWidth: "0" }}
          />
          <span
            style={{
              paddingTop: "5px",
              whiteSpace: "nowrap",
              fontSize: "0.9rem",
              opacity: 0.8,
            }}
          >
            / {nextLevelGiri}
          </span>
        </div>
      </div>
    </div>
  );
};
