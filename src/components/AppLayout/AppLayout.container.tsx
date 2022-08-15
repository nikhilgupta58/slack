import React from "react";
import AppLayoutView from "./AppLayout.view";
import { AppLayoutContext } from "./utils/context";

export default function AppLayoutContainer({ children }) {
  return (
    <AppLayoutContext.Provider value={{children}}>
      <AppLayoutView />
    </AppLayoutContext.Provider>
  );
}
