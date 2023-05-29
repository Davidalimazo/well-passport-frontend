"use client";

import { create } from "zustand";

const store = JSON.parse(window.localStorage.getItem("client") || "{}");

interface Props {
  clientId: string | undefined;
  clientName: string | undefined;
  setField: (id: string | undefined, name: string | undefined) => void;
}

const useSetField = create<Props>((set) => ({
  clientId: store.clientId,
  clientName: store.clientName,
  setField: async (id: string | undefined, name: string | undefined) => {
    set((state) => ({ ...state, clientId: id, clientName: name }));
    window.localStorage.setItem(
      "client",
      JSON.stringify({ clientId: id, clientName: name })
    );
  },
}));

export default useSetField;
