import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { i18n } from "@lingui/core";
import { routeTree } from "./routeTree.gen";
import { ThemeProvider } from "@theme/ThemeProvider";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { useThemeStyle } from "./styles/ThemeCssProp";
import "./styles/index.css";
import "./styles/normalize.css";

// i18n.load("en", messages);
// i18n.activate("en");

const loading = (
  <div className="home__loading">
    <span className="span__loading">Loading</span>
  </div>
);

export const router = createRouter({
  routeTree,
  defaultPendingMinMs: 500,
  defaultPendingComponent: () => loading,
});

const RootMechanism = () => {
  const invertedStyles = useThemeStyle();

  return (
    <div className="root_div" style={invertedStyles}>
      <RouterProvider router={router} />
    </div>
  );
};

const RootApp = () => {
  return (
    <StrictMode>
      <ThemeProvider>
        <RootMechanism />
      </ThemeProvider>
    </StrictMode>
  );
};

createRoot(document.getElementById("root")!).render(<RootApp />);
