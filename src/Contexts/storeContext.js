import { createContext, useState, useEffect } from "react";
import React from "react";
import { productAPI } from "../services/api";

export const storeContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch products from backend on component mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const products = await productAPI.listProducts();
        setAllProducts(products);
      } catch (err) {
        console.error('Failed to fetch products:', err);
        setError('Failed to load products. Please check your connection.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter products by category
  const fullMealsMenu = allProducts.filter(product => product.category === "DelightMeals");
  const fastFoodMenu = allProducts.filter(product => product.category === "Fastfood");
  const snackFoodMenu = allProducts.filter(product => product.category === "Snacks");
  const grubmartMenu = allProducts.filter(product => product.category === "GrubMart");

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
    getCartTotal,
    loading,
    error,
    allProducts
  };

  return (
    <storeContext.Provider value={contextValue}>
      {props.children}
    </storeContext.Provider>
  );
};

export default StoreContextProvider;