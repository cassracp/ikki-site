import React, { useEffect } from "react";
import { useGameStore } from "../../store/useGameStore";
import styles from "./inventory.module.css";
import clsx from "clsx";

export const InventorySection: React.FC = () => {
  const { character, generateSlots, updateInventorySlot } = useGameStore();

  useEffect(() => {
    // Init slots - Legacy had 12 rows
    generateSlots(12);
  }, [generateSlots]);

  const totalSlots = character.inventory.reduce(
    (acc, slot) => acc + (slot.slots || 0),
    0
  );
  const isOverloaded = totalSlots > 10;
  const loadPercentage = Math.min((totalSlots / 10) * 100, 100);

  return (
    <div className={clsx(styles.section, isOverloaded && styles.overloaded)}>
      <div className={styles.header}>
        <label
          className={clsx(styles.title, isOverloaded && styles.overloadedTitle)}
        >
          Inventário & Logística
        </label>

        <div className={styles.loadBarContainer}>
          <div
            className={clsx(
              styles.loadBarFill,
              isOverloaded && styles.overloadedFill
            )}
            style={{ width: `${loadPercentage}%` }}
          />
          <div className={styles.loadBarText}>
            <span>{totalSlots}</span> / 10 Slots
          </div>
        </div>
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th style={{ width: "10%" }}>Slots</th>
            <th style={{ width: "15%" }}>Qtd/Carga</th>
            <th style={{ width: "30%" }}>Item</th>
            <th style={{ width: "45%" }}>Descrição / Notas</th>
          </tr>
        </thead>
        <tbody>
          {character.inventory.map((slot) => (
            <tr key={slot.id}>
              <td>
                <input
                  type="number"
                  className={styles.inputFull}
                  value={slot.slots}
                  min={0}
                  onChange={(e) =>
                    updateInventorySlot(slot.id, {
                      slots: Number(e.target.value),
                    })
                  }
                />
              </td>
              <td>
                <input
                  type="text"
                  className={styles.inputFull}
                  value={slot.quantityDisplay}
                  onChange={(e) =>
                    updateInventorySlot(slot.id, {
                      quantityDisplay: e.target.value,
                    })
                  }
                />
              </td>
              <td>
                <input
                  type="text"
                  className={styles.inputFull}
                  value={slot.name}
                  placeholder={`Item...`}
                  onChange={(e) =>
                    updateInventorySlot(slot.id, { name: e.target.value })
                  }
                />
              </td>
              <td>
                <input
                  type="text"
                  className={styles.inputFull}
                  value={slot.description}
                  placeholder="Detalhes..."
                  onChange={(e) =>
                    updateInventorySlot(slot.id, {
                      description: e.target.value,
                    })
                  }
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ marginTop: "10px", fontSize: "0.8rem", color: "#666" }}>
        * Fome ocupa 4 Slots. Sede ocupa 4 Slots. Kegalé ocupa 2 Slots.
      </div>
    </div>
  );
};
