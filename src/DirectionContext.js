import React, { createContext, useContext, useState } from "react";

const DirectionContext = createContext();

export const DirectionProvider = ({ children }) => {
  const [direction, setDirection] = useState("ltr"); // Default direction is left-to-right

  const toggleDirection = () => {
    const newDirection = direction === "ltr" ? "rtl" : "ltr";
    setDirection(newDirection);
  };

  return (
    <DirectionContext.Provider value={{ direction, toggleDirection }}>
      {children}
    </DirectionContext.Provider>
  );
};

export const useDirection = () => {
  return useContext(DirectionContext);
};
