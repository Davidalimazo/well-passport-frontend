import { create } from "zustand";

const store = JSON.parse(window.localStorage.getItem("project") || "{}");

interface Props {
  projectId: string | undefined;
  projectName: string | undefined;
  setProject: (id: string | undefined, name: string | undefined) => void;
}

const useSetProject = create<Props>((set) => ({
  projectId: store.clientId,
  projectName: store.clientName,
  setProject: async (id: string | undefined, name: string | undefined) => {
    set((state) => ({ ...state, projectId: id, projectName: name }));
    window.localStorage.setItem(
      "project",
      JSON.stringify({ projectId: id, projectName: name })
    );
  },
}));

export default useSetProject;
