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
    current: number | string; // Input allows text if empty, but mostly number
    max: number | string;
    scars: string;
}

export interface IStats {
    mentsu: {
        base: number;
        mod: number;
    };
    hara: IHara;
    movement: {
        dons: string;
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
