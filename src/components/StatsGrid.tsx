import React from "react";
import { useGameStore } from "../store/useGameStore";
import clsx from "clsx";
import styles from "./stats.module.css";

export const StatsGrid: React.FC = () => {
  const { character, updateMentsu, updateHara, updateMovement } =
    useGameStore();
  const { stats, inventory } = character;

  // Derived State
  const totalSlots = inventory.reduce(
    (acc: number, slot) => acc + (slot.slots || 0),
    0
  );
  const isOverloaded = totalSlots > 10;

  // Mentsu Logic
  const mentsuBonus = isOverloaded ? -2 : 0;
  const finalMentsu =
    (stats.mentsu.base || 0) + (stats.mentsu.mod || 0) + mentsuBonus;

  // Movement Logic
  const currentSpeed = isOverloaded ? "15' (4,5m)" : "30' (9m)";

  return (
    <div className={styles.grid}>
      {/* Mentsu Box */}
      <div
        className={clsx(styles.statBox, isOverloaded && styles.overloadedBox)}
      >
        <label>Mentsu (Vontade)</label>
        <div
          className={clsx(
            styles.bigValue,
            isOverloaded && styles.overloadedText
          )}
        >
          {finalMentsu}
        </div>

        <div className={styles.subStats}>
          <div className="input-group">
            <label>Base</label>
            <input
              type="number"
              style={{ width: "50px", textAlign: "center" }}
              value={stats.mentsu.base}
              onChange={(e) => updateMentsu({ base: Number(e.target.value) })}
            />
          </div>
          <div className="input-group">
            <label>Status (+/-)</label>
            <input
              type="number"
              style={{ width: "50px", textAlign: "center" }}
              value={stats.mentsu.mod}
              onChange={(e) => updateMentsu({ mod: Number(e.target.value) })}
            />
          </div>
        </div>
        {isOverloaded && (
          <div className={styles.warningText}>SOBRECARGA (-2)</div>
        )}
      </div>

      {/* Hara Box */}
      <div className={styles.statBox}>
        <label>Hara (Fôlego)</label>
        <div className={styles.subStats} style={{ marginTop: "10px" }}>
          <div className="input-group">
            <label>Atual</label>
            <input
              type="text" // keep text to allow empty placeholder
              className={styles.bigInput}
              placeholder="MAX"
              value={stats.hara.current}
              onChange={(e) => updateHara({ current: e.target.value })}
            />
          </div>
          <div style={{ fontSize: "2rem", paddingTop: "10px" }}>/</div>
          <div className="input-group">
            <label>Total</label>
            <input
              type="text"
              className={styles.bigInput}
              placeholder="MAX"
              value={stats.hara.max}
              onChange={(e) => updateHara({ max: e.target.value })}
            />
          </div>
        </div>
        <div
          className="input-group"
          style={{ width: "100%", marginTop: "10px" }}
        >
          <label>Cicatrizes / Amputações</label>
          <textarea
            rows={2}
            style={{ fontSize: "0.8rem" }}
            value={stats.hara.scars}
            onChange={(e) => updateHara({ scars: e.target.value })}
          />
        </div>
      </div>

      {/* Movement Box */}
      <div
        className={clsx(styles.statBox, isOverloaded && styles.overloadedBox)}
      >
        <label>Deslocamento</label>
        <div className={styles.bigValue}>{currentSpeed}</div>
        {isOverloaded && (
          <div className={styles.warningText}>LENTO (SOBRECARGA)</div>
        )}
        <div style={{ marginTop: "auto", width: "100%" }}>
          <label>Condições</label>
          <textarea
            rows={3}
            style={{ fontSize: "0.8rem" }}
            placeholder="Ex: Cego, Ferido, Envenenado..."
            value={stats.movement.conditions}
            onChange={(e) => updateMovement({ conditions: e.target.value })}
          />
        </div>
      </div>
    </div>
  );
};
