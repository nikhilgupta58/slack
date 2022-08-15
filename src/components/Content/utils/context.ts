
import React from "react";

export const ContentContext = React.createContext(null);

export const useContentContext = () => {
  const context = React.useContext(ContentContext);
  if (!context)
    throw new Error("useContentContext can not be used outside it's provider");
  return context;
};
