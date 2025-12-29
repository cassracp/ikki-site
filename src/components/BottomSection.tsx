import React from "react";
import { useGameStore } from "../store/useGameStore";
import { ImageUploader } from "./ImageUploader";
import styles from "./bottom.module.css";

export const BottomSection: React.FC = () => {
  const { character, updateCharacterMeta } = useGameStore();
  const { meta } = character;

  return (
    <div className={styles.grid}>
      <div className="input-group" style={{ position: "relative" }}>
        <ImageUploader />
        <div className={styles.stampContainer}>
          <span className={styles.stampText}>一揆: 盲官坊 譚</span>
          <img src="/kabuto.svg" alt="Stamp" className={styles.hankoStamp} />
        </div>
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

          <div className={styles.notesWrapper}>
            <label style={{ fontSize: "1.2rem" }}>
              Anotações & Kesshi (Votos)
            </label>
            <textarea
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
