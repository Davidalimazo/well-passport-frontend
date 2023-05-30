import { create } from "zustand";

const store = JSON.parse(window.localStorage.getItem("report") || "{}");

interface Props {
  reportId: string | undefined;
  reportName: string | undefined;
  setReport: (id: string | undefined, name: string | undefined) => void;
}

const useSetReport = create<Props>((set) => ({
  reportId: store.clientId,
  reportName: store.clientName,
  setReport: async (id: string | undefined, name: string | undefined) => {
    set((state) => ({ ...state, reportId: id, reportName: name }));
    window.localStorage.setItem(
      "report",
      JSON.stringify({ reportId: id, reportName: name })
    );
  },
}));

export default useSetReport;
