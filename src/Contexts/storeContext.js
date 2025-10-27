import { createContext, useState } from "react";
import React from "react";
import fastFoodMenu from "../food/Fastmeal";
import fullMealsMenu from "../food/Fullmeal";
import snackFoodMenu from "../food/Snackmeal";
import grubmartMenu from "../food/Grubmart";

export const storeContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState([]);

  // Add item to cart or update quantity if already exists
  const addToCart = (item, quantity) => {
    if (quantity <= 0) return;
    
    setCartItems((prevCart) => {
      // Check if item already exists in cart
      const existingItemIndex = prevCart.findIndex(
        (cartItem) => cartItem.id === item.id && cartItem.category === item.category
      );

      if (existingItemIndex !== -1) {
        // Item exists, update quantity
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex] = {
          ...updatedCart[existingItemIndex],
          quantity: updatedCart[existingItemIndex].quantity + quantity
        };
        return updatedCart;
      } else {
        // New item, add to cart
        return [...prevCart, { ...item, quantity }];
      }
    });
  };

  // Update item quantity in cart
  const updateCartItemQuantity = (itemId, category, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(itemId, category);
      return;
    }
    
    setCartItems((prevCart) =>
      prevCart.map((item) =>
        item.id === itemId && item.category === category
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  // Remove item from cart
  const removeFromCart = (itemId, category) => {
    setCartItems((prevCart) =>
      prevCart.filter((item) => !(item.id === itemId && item.category === category))
    );
  };

  // Clear entire cart
  const clearCart = () => {
    setCartItems([]);
  };

  // Get cart total
  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const contextValue = {
    fullMealsMenu,
    fastFoodMenu,
    snackFoodMenu,
    grubmartMenu,
    cartItems,
    addToCart,
    updateCartItemQuantity,
    removeFromCart,
    clearCart,
    getCartTotal
  };

  return (
    <storeContext.Provider value={contextValue}>
      {props.children}
    </storeContext.Provider>
  );
};

export default StoreContextProvider;