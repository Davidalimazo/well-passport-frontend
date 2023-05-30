import { create } from "zustand";

const store = JSON.parse(window.localStorage.getItem("well") || "{}");

interface Props {
  wellId: string | undefined;
  wellName: string | undefined;
  setWell: (id: string | undefined, name: string | undefined) => void;
}

const useSetWells = create<Props>((set) => ({
  wellId: store.clientId,
  wellName: store.clientName,
  setWell: async (id: string | undefined, name: string | undefined) => {
    set((state) => ({ ...state, wellId: id, wellName: name }));
    window.localStorage.setItem(
      "well",
      JSON.stringify({ wellId: id, wellName: name })
    );
  },
}));

export default useSetWells;
