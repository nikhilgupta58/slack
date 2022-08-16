
import React from "react";

export const MessageBoxContext = React.createContext(null);

export const useMessageBoxContext = () => {
  const context = React.useContext(MessageBoxContext);
  if (!context)
    throw new Error("useMessageBoxContext can not be used outside it's provider");
  return context;
};
