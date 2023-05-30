const BASE_URI = import.meta.env.VITE_BASE_URI;
export const authRoutes = BASE_URI + "users";
export const clientRoutes = BASE_URI + "client";
export const fieldRoutes = BASE_URI + "field";
export const wellRoutes = BASE_URI + "well";
export const projectRoutes = BASE_URI + "project";

export const apiRoutes = {
  login: authRoutes + "/login",
  getWellProjects: projectRoutes + "/well/",
};
