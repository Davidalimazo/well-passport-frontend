import { useLocalStorage } from "@mantine/hooks";
import { create } from "zustand";

export interface IUser {
  createdAt: string;
  creatorId: string;
  email: string;
  firstName: string;
  image: string;
  lastName: string;
  password: string;
  role: string;
  updatedAt: string;
  userId: string;
  _id: string;
}

interface Props {
  user: IUser | null;
  setUser: (user: IUser | null) => void;
  logOut: () => void;
}

const localStorage: IUser = JSON.parse(
  window.localStorage.getItem("user") || "{}"
);

const useAuth = create<Props>((set) => ({
  user: localStorage,
  setUser: async (prop: IUser | null) => {
    set({ user: prop });
    window.localStorage.setItem("user", JSON.stringify(prop));
  },
  logOut: () => {
    set({ user: null });
    window.localStorage.removeItem("user");
  },
}));

export default useAuth;
