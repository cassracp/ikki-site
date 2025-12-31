export interface IInventorySlot {
  id: string; // uuid
  slots: number; // The logic uses "slot-val" input which is the "weight" or "size"
  quantityDisplay: string; // "Qtd/Carga" column - plain text in legacy
  name: string; // "Item" column
  description: string; // "Descrição / Notas" column
}

export interface IPortrait {
  url: string;
}

export interface IHara {
  current: number | 4;
  max: number | 4;
  scars: string;
}

export interface IStats {
  mentsu: {
    base: number | 4;
    mod: number | 0;
  };
  hara: IHara;
  movement: {
    conditions: string;
  };
}

export interface ICharacter {
  meta: {
    name: string;
    sex: string;
    level: number;
    giri: string;
    titles: string;
    notes: string;
    image: IPortrait;
  };
  stats: IStats;
  inventory: IInventorySlot[];
}
