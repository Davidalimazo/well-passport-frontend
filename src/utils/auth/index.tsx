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
  checkExpiredToken: () => void;
}

const localStorage = JSON.parse(window.localStorage.getItem("user") || "{}");

//var currentTime = new Date().getTime();

const useAuth = create<Props>((set, get) => ({
  user: localStorage.user,
  token: localStorage.token,
  setUser: async (user: IUser | null, token: string | undefined) => {
    set((state) => ({ ...state, user, token }));
    window.localStorage.setItem("user", JSON.stringify({ user, token }));
  },
  logOut: () => {
    set({ user: null, token: undefined });
    window.localStorage.removeItem("user");
  },
  checkExpiredToken: () => {
    if (get().user?.exp) {
      //@ts-ignore
      if (Date.now() - get().user?.exp > 0) {
        set({ user: null, token: undefined });
        window.localStorage.removeItem("user");
      }
    }
  },
}));

export default useAuth;
