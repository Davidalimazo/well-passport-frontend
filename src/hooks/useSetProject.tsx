'use client';

import { create } from 'zustand';

interface Props {
  project: string | undefined;
  setField: (field: string | undefined) => void;
}

const useSetProject = create<Props>((set) => ({
  project: undefined,
  setField: async (prop: string | undefined) => {
    set({ project: prop });
  },
}));

export default useSetProject;
