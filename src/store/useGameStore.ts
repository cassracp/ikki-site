import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { ICharacter, IInventorySlot } from "../types";
import { v4 as uuidv4 } from "uuid";
import LZString from "lz-string";

export const GIRI_PROGRESSION = [
  { level: 1, min: 0 },
  { level: 2, min: 100 },
  { level: 3, min: 300 },
  { level: 4, min: 500 },
  { level: 5, min: 800 },
  { level: 6, min: 1500 },
  { level: 7, min: 3000 },
  { level: 8, min: 4500 },
  { level: 9, min: 6000 },
  { level: 10, min: 7500 },
];

export const getNextLevelGiri = (level: number) => {
  const nextLevel = level + 1;
  const entry = GIRI_PROGRESSION.find((p) => p.level === nextLevel);
  return entry ? entry.min : "MAX";
};

interface GameState {
  character: ICharacter;
  isReadOnly: boolean;
  // Actions
  updateCharacterMeta: (updates: Partial<ICharacter["meta"]>) => void;
  updateStats: (updates: Partial<ICharacter["stats"]>) => void;
  updateHara: (updates: Partial<ICharacter["stats"]["hara"]>) => void;
  updateMentsu: (updates: Partial<ICharacter["stats"]["mentsu"]>) => void;
  updateMovement: (updates: Partial<ICharacter["stats"]["movement"]>) => void;

  // Inventory Actions
  updateInventorySlot: (
    slotId: string,
    updates: Partial<IInventorySlot>
  ) => void;
  generateSlots: (count: number) => void;

  // Persistence Actions
  loadCharacter: (character: ICharacter) => void;

  // Share Actions
  generateShareLink: () => string;
  loadFromShareLink: (compressedData: string) => void;
}

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      character: {
        meta: {
          name: "",
          sex: "",
          level: 1,
          giri: "",
          titles: "",
          notes: "",
          image: { url: "" },
        },
        stats: {
          mentsu: { base: 1, mod: 0 },
          hara: { current: 4, max: 4, scars: "" },
          movement: { conditions: "" },
        },
        inventory: [],
      },
      isReadOnly: false,
      updateCharacterMeta: (updates) =>
        set((state) => {
          const newMeta = { ...state.character.meta, ...updates };

          // Auto-level logic if Giri is updated
          if (updates.giri !== undefined) {
            const giriStr = String(updates.giri).replace(/[^\d]/g, "");
            const giriVal = parseInt(giriStr, 10);

            if (!isNaN(giriVal)) {
              let calculatedLevel = 1;
              for (const row of GIRI_PROGRESSION) {
                if (giriVal >= row.min) {
                  calculatedLevel = row.level;
                } else {
                  break;
                }
              }
              newMeta.level = Math.min(calculatedLevel, 10);
            }
          }

          // Limit manual level update
          if (newMeta.level > 10) {
            newMeta.level = 10;
          }

          return {
            character: {
              ...state.character,
              meta: newMeta,
            },
          };
        }),
      updateStats: (updates) =>
        set((state) => ({
          character: {
            ...state.character,
            stats: { ...state.character.stats, ...updates },
          },
        })),
      updateHara: (updates) =>
        set((state) => ({
          character: {
            ...state.character,
            stats: {
              ...state.character.stats,
              hara: { ...state.character.stats.hara, ...updates },
            },
          },
        })),
      updateMentsu: (updates) =>
        set((state) => ({
          character: {
            ...state.character,
            stats: {
              ...state.character.stats,
              mentsu: { ...state.character.stats.mentsu, ...updates },
            },
          },
        })),
      updateMovement: (updates) =>
        set((state) => ({
          character: {
            ...state.character,
            stats: {
              ...state.character.stats,
              movement: { ...state.character.stats.movement, ...updates },
            },
          },
        })),

      updateInventorySlot: (slotId, updates) =>
        set((state) => ({
          character: {
            ...state.character,
            inventory: state.character.inventory.map((slot) =>
              slot.id === slotId ? { ...slot, ...updates } : slot
            ),
          },
        })),

      generateSlots: (count) =>
        set((state) => {
          if (state.character.inventory.length >= count)
            return { character: state.character };

          const currentLen = state.character.inventory.length;
          const needed = count - currentLen;

          const newSlots: IInventorySlot[] = Array.from({ length: needed }).map(
            (_, idx) => ({
              id: uuidv4(),
              slots: currentLen + idx < 3 ? 1 : 0,
              quantityDisplay: "",
              name: "",
              description: "",
            })
          );
          return {
            character: {
              ...state.character,
              inventory: [...state.character.inventory, ...newSlots],
            },
          };
        }),

      loadCharacter: (character) => set({ character }),

      generateShareLink: () => {
        const { character } = get();
        // Clone state to avoid modifying the original and remove heavy data (image)
        const characterCopy = JSON.parse(JSON.stringify(character));
        if (characterCopy.meta) {
          characterCopy.meta.image = { url: "" };
        }
        const serialized = JSON.stringify(characterCopy);
        const compressed = LZString.compressToEncodedURIComponent(serialized);
        const url = new URL(window.location.href);
        url.searchParams.set("data", compressed);
        return url.toString();
      },

      loadFromShareLink: (compressedData: string) => {
        try {
          const decompressed =
            LZString.decompressFromEncodedURIComponent(compressedData);
          if (!decompressed) return;

          const character = JSON.parse(decompressed);
          set({ character, isReadOnly: true });
        } catch (e) {
          console.error("Falha ao carregar dados do link:", e);
        }
      },
    }),
    {
      name: "ikki-storage-v2",
      partialize: (state) => ({ character: state.character }),
    }
  )
);
