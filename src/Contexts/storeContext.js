import { createContext, useState, useEffect } from "react";
import React from "react";
import { productAPI, orderAPI } from "../services/api";

export const storeContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState([]);
  const [favoriteItems, setFavoriteItems] = useState([]);
  const [myOrders, setMyOrders] = useState([]);
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
  const fastFoodMenu = allProducts.filter(product => product.category === "FastFood");
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

  // Add item to favorites
  const addToFavorites = (item) => {
    setFavoriteItems((prevFavorites) => {
      // Check if item already exists in favorites
      const existingItemIndex = prevFavorites.findIndex(
        (favItem) => favItem.id === item.id
      );

      if (existingItemIndex !== -1) {
        // Item already in favorites, don't add again
        return prevFavorites;
      } else {
        // New item, add to favorites
        return [...prevFavorites, item];
      }
    });
  };

  // Remove item from favorites
  const removeFromFavorites = (itemId) => {
    setFavoriteItems((prevFavorites) =>
      prevFavorites.filter((item) => item.id !== itemId)
    );
  };

  // Check if item is in favorites
  const isInFavorites = (itemId) => {
    return favoriteItems.some((item) => item.id === itemId);
  };

  // Toggle favorite status
  const toggleFavorite = (item) => {
    if (isInFavorites(item.id)) {
      removeFromFavorites(item.id);
    } else {
      addToFavorites(item);
    }
  };

  // Fetch orders from backend
  const fetchOrders = async () => {
    try {
      const response = await orderAPI.getActiveOrders();
      if (response.success) {
        setMyOrders(response.data);
      }
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    }
  };

  // Place order - move cart items to orders and save to backend
  const placeOrder = async (orderDetails) => {
    if (cartItems.length === 0) return null;

    const orderId = `ORD-${Date.now()}`;
    const orderData = {
      orderId,
      items: cartItems.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image,
        category: item.category
      })),
      orderDetails,
      total: getCartTotal()
    };

    try {
      const response = await orderAPI.createOrder(orderData);
      if (response.success) {
        // Add to local state
        setMyOrders((prevOrders) => [...prevOrders, response.order]);
        // Clear cart
        setCartItems([]);
        return response.order;
      }
    } catch (error) {
      console.error('Failed to place order:', error);
      throw error;
    }
  };

  // Update order status
  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const response = await orderAPI.updateOrderStatus(orderId, newStatus);
      if (response.success) {
        // Update local state
        setMyOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.orderId === orderId ? { ...order, status: newStatus } : order
          )
        );
        
        // If completed or rejected, fetch updated orders
        if (newStatus === 'completed' || newStatus === 'rejected') {
          fetchOrders();
        }
      }
    } catch (error) {
      console.error('Failed to update order status:', error);
      throw error;
    }
  };

  // Get pending orders count (for notification dot)
  const getPendingOrdersCount = () => {
    return myOrders.filter(order => 
      order.status === 'pending' || order.status === 'accepted' || order.status === 'on-the-way'
    ).length;
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
    allProducts,
    favoriteItems,
    addToFavorites,
    removeFromFavorites,
    isInFavorites,
    toggleFavorite,
    myOrders,
    placeOrder,
    updateOrderStatus,
    getPendingOrdersCount,
    fetchOrders
  };

  return (
    <storeContext.Provider value={contextValue}>
      {props.children}
    </storeContext.Provider>
  );
};

export default StoreContextProvider;