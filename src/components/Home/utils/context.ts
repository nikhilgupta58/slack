
import React from "react";

export const HomeContext = React.createContext(null);

export const useHomeContext = () => {
  const context = React.useContext(HomeContext);
  if (!context)
    throw new Error("useHomeContext can not be used outside it's provider");
  return context;
};
