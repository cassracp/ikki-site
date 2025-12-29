import React from "react";
import { useGameStore } from "../store/useGameStore";
import { ImageUploader } from "./ImageUploader";
import styles from "./bottom.module.css";

export const BottomSection: React.FC = () => {
  const { character, updateCharacterMeta } = useGameStore();
  const { meta } = character;

  return (
    <div className={styles.grid}>
      <div className="input-group">
        <ImageUploader />
      </div>

      <div className="input-group">
        <div className={styles.titlesBox}>
          <label style={{ fontSize: "1.2rem" }}>
            Títulos & Habilidades (Perícias)
          </label>
          <textarea
            rows={6}
            placeholder="Ex: Arrombador de Portas, Cozinheiro de Campanha, Ex-Samurai do Clã Garça..."
            value={meta.titles}
            onChange={(e) => updateCharacterMeta({ titles: e.target.value })}
          />

          <div
            style={{
              marginTop: "20px",
              borderTop: "1px solid var(--ink-black)",
              paddingTop: "10px",
            }}
          >
            <label style={{ fontSize: "1.2rem" }}>
              Anotações & Kesshi (Votos)
            </label>
            <textarea
              rows={6}
              placeholder="Anotações de campanha, dívidas, promessas espirituais..."
              value={meta.notes}
              onChange={(e) => updateCharacterMeta({ notes: e.target.value })}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
