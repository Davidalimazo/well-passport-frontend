import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Layout } from "./components/layout/AppLayout.tsx";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <Layout>
          <App />
        </Layout>
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
);
