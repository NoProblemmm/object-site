import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { Welcome } from "./pages/welcome/Welcome";
import "./styles/index.css";
import "./styles/normalize.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Welcome />
  </StrictMode>
);
