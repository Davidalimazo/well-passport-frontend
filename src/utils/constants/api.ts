const BASE_URI = import.meta.env.VITE_BASE_URI;
const authRoutes = BASE_URI + "users";
const clientRoutes = BASE_URI + "client";

export const apiRoutes = {
  login: authRoutes + "/login",
};
