import { Toaster } from "react-hot-toast";
import "./App.css";
import AppRoutes from "./components/approutes/AppRoutes";

function App() {
  return (
    <>
      <AppRoutes />
      <Toaster />
    </>
  );
}

export default App;
