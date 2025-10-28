import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { routeTree } from "./routeTree.gen";

import { createRouter, RouterProvider } from "@tanstack/react-router";
import "./styles/index.css";
import "./styles/normalize.css";

const loading = <div>Loading</div>;

export const router = createRouter({
  routeTree,
  defaultPendingMinMs: 500,
  defaultPendingComponent: () => loading,
});

const RootApp = () => {
  return (
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  );
};

createRoot(document.getElementById("root")!).render(<RootApp />);
