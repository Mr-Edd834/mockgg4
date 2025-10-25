import { createContext } from "react";
import React from "react";
import fastFoodMenu from "../food/Fastmeal";
import fullMealsMenu from "../food/Fullmeal";
import snackFoodMenu from "../food/Snackmeal";

export const storeContext = createContext(null);

const StoreContextProvider = (props) => {
  const contextValue = {
    fullMealsMenu,
    fastFoodMenu,
    snackFoodMenu
  };

  return (
    <storeContext.Provider value={contextValue}>
      {props.children}
    </storeContext.Provider>
  );
};

export default StoreContextProvider;