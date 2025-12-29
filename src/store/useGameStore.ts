import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { ICharacter, IInventorySlot } from "../types";
import { v4 as uuidv4 } from "uuid";

interface GameState {
  character: ICharacter;
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
}

export const useGameStore = create<GameState>()(
  persist(
    (set) => ({
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
          hara: { current: "", max: "", scars: "" },
          movement: { conditions: "" },
        },
        inventory: [],
      },
      updateCharacterMeta: (updates) =>
        set((state) => ({
          character: {
            ...state.character,
            meta: { ...state.character.meta, ...updates },
          },
        })),
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
          // As per legacy lines 387-396, first 3 slots are defaulted to 1, others 0.
          // We will just create 0 slots here, and logic can dictate default if needed,
          // but typically we preserve state if it exists.
          const needed = count - currentLen;

          const newSlots: IInventorySlot[] = Array.from({ length: needed }).map(
            (_, idx) => ({
              id: uuidv4(),
              slots: currentLen + idx < 3 ? 1 : 0, // Legacy default behavior
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
    }),
    {
      name: "ikki-storage-v2", // Versioned to prevent schema conflicts
      partialize: (state) => ({ character: state.character }),
    }
  )
);
