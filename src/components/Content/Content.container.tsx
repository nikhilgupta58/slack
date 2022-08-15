import React from "react";
import ContentView from "./Content.view";
import { ContentContext } from "./utils/context";

export default function ContentContainer() {
  return (
    <ContentContext.Provider value={{}}>
      <ContentView />
    </ContentContext.Provider>
  );
}
