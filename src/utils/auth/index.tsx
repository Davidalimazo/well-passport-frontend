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
  exp: number;
  _id: string;
}

interface Props {
  user: IUser | null;
  token: string | undefined;
  setUser: (user: IUser | null, token: string | undefined) => void;
  logOut: () => void;
}

const localStorage = JSON.parse(window.localStorage.getItem("user") || "{}");

//var currentTime = new Date().getTime();

const useAuth = create<Props>((set) => ({
  user: localStorage?.user,
  token: localStorage?.token,
  setUser: async (user: IUser | null, token: string | undefined) => {
    set((state) => ({ ...state, user, token }));
    window.localStorage.setItem("user", JSON.stringify({ user, token }));
  },
  logOut: () => {
    set({ user: null, token: undefined });
    window.localStorage.clear();
  },
}));

export default useAuth;
