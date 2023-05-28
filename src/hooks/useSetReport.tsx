'use client';

import { create } from 'zustand';

interface Props {
  report: string | undefined;
  setField: (field: string | undefined) => void;
}

const useSetReport = create<Props>((set) => ({
  report: undefined,
  setField: async (prop: string | undefined) => {
    set({ report: prop });
  },
}));

export default useSetReport;
