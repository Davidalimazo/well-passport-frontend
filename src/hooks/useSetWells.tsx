'use client';

import { create } from 'zustand';

interface Props {
  wells: string | undefined;
  setField: (field: string | undefined) => void;
}

const useSetWells = create<Props>((set) => ({
  wells: undefined,
  setField: async (prop: string | undefined) => {
    set({ wells: prop });
  },
}));

export default useSetWells;
