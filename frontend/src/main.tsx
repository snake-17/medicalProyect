import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./components/context/AuthContext.tsx";
import App from "./App.tsx";
import "bootstrap/dist/css/bootstrap.min.css";

createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StrictMode>
  </AuthProvider>,
);
