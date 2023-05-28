'use client';

import { create } from 'zustand';

interface Props {
  clientId: string | undefined;
  clientName: string | undefined;
  setField: (id: string | undefined, name: string | undefined) => void;
}

const useSetField = create<Props>((set) => ({
  clientId: undefined,
  clientName: undefined,
  setField: async (id: string | undefined, name: string | undefined) => {
    set((state) => ({ ...state, clientId: id, clientName: name }));
  },
}));

export default useSetField;
