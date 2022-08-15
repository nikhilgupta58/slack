import React from "react";
import HomeView from "./Home.view";
import { HomeContext } from "./utils/context";

export default function HomeContainer() {
  return (
    <HomeContext.Provider value={{}}>
      <HomeView />
    </HomeContext.Provider>
  );
}
