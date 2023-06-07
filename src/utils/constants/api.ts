const BASE_URI = import.meta.env.VITE_BASE_URI;
export const UPLOADS = import.meta.env.VITE_BASE_UPLOADS;
export const authRoutes = BASE_URI + "users";
export const clientRoutes = BASE_URI + "client";
export const fieldRoutes = BASE_URI + "field";
export const wellRoutes = BASE_URI + "well";
export const projectRoutes = BASE_URI + "project";
export const reportRoutes = BASE_URI + "report";

export const apiRoutes = {
  login: authRoutes + "/login",
  changePassword: authRoutes + "/changepassword/",
  getWellProjects: projectRoutes + "/well/",
  getReportByProjectId: reportRoutes + "/project/",
  uploadProfileImg: authRoutes + "/upload-image/",
  getClientWells: wellRoutes + "/client/",
};
