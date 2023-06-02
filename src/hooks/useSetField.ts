"use client";

import { create } from "zustand";

const store = JSON.parse(window.localStorage.getItem("field") || "{}");

interface Props {
  fieldId: string | undefined;
  fieldName: string | undefined;
  setField: (id: string, name: string) => void;
}

const useSetField = create<Props>((set) => ({
  fieldId: store.fieldId,
  fieldName: store.fieldName,
  setField: async (id: string | undefined, name: string | undefined) => {
    set((state) => ({ ...state, fieldId: id, fieldName: name }));
    window.localStorage.setItem(
      "field",
      JSON.stringify({ fieldId: id, fieldName: name })
    );
  },
}));

export default useSetField;
