import { createContext, useState, useEffect, useContext } from "react";
import React from "react";
import { productAPI, orderAPI } from "../services/api";
import { useAuth } from "./AuthContext";
import axios from "axios";

export const storeContext = createContext(null);

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const StoreContextProvider = (props) => {
  const auth = useAuth();
  const currentUser = auth?.currentUser;
  const getIdToken = auth?.getIdToken || (() => Promise.resolve(null));
  
  const [cartItems, setCartItems] = useState([]);
  const [favoriteItems, setFavoriteItems] = useState([]);
  const [myOrders, setMyOrders] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch products ONCE on mount (doesn't depend on user)
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const products = await productAPI.listProducts();
        setAllProducts(products);
      } catch (err) {
        console.error('Failed to fetch products:', err);
        setError('Failed to load products. Please check your backend connection.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Fetch user-specific data when user changes
  useEffect(() => {
    if (currentUser) {
      fetchUserFavorites();
      fetchOrders();
    } else {
      setFavoriteItems([]);
      setMyOrders([]);
    }
  }, [currentUser]);

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

  // Fetch user favorites from backend
  const fetchUserFavorites = async () => {
    if (!currentUser) return;
    
    try {
      const token = await getIdToken();
      const response = await axios.get(
        `${API_URL}/api/users/favorites`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      if (response.data.success) {
        // Transform backend format to frontend format
        const favorites = response.data.favorites.map(fav => ({
          id: fav.productId,
          name: fav.name,
          image: fav.image,
          price: fav.price,
          category: fav.category
        }));
        setFavoriteItems(favorites);
      }
    } catch (error) {
      console.error('Failed to fetch favorites:', error);
    }
  };

  // Add item to favorites
  const addToFavorites = async (item) => {
    if (!currentUser) {
      alert('Please log in to add favorites');
      return;
    }
    
    // Check if already in favorites
    if (isInFavorites(item.id)) {
      return;
    }
    
    try {
      const token = await getIdToken();
      const response = await axios.post(
        `${API_URL}/api/users/favorites/add`,
        {
          uid: currentUser.uid,  // Include user ID
          productId: item.id,
          name: item.name,
          image: item.image,
          price: item.price,
          category: item.category
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      if (response.data.success) {
        setFavoriteItems((prev) => [...prev, item]);
      }
    } catch (error) {
      console.error('Failed to add to favorites:', error);
      alert('Failed to add to favorites');
    }
  };

  // Remove item from favorites
  const removeFromFavorites = async (itemId) => {
    if (!currentUser) return;
    
    try {
      const token = await getIdToken();
      const response = await axios.post(
        `${API_URL}/api/users/favorites/remove`,
        {
          uid: currentUser.uid,  // Include user ID
          productId: itemId
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      if (response.data.success) {
        setFavoriteItems((prevFavorites) =>
          prevFavorites.filter((item) => item.id !== itemId)
        );
      }
    } catch (error) {
      console.error('Failed to remove from favorites:', error);
      alert('Failed to remove from favorites');
    }
  };

  // Check if item is in favorites
  const isInFavorites = (itemId) => {
    return favoriteItems.some((item) => item.id === itemId);
  };

  // Toggle favorite status
  const toggleFavorite = async (item) => {
    if (isInFavorites(item.id)) {
      await removeFromFavorites(item.id);
    } else {
      await addToFavorites(item);
    }
  };

  // Fetch user-specific orders from backend
  const fetchOrders = async () => {
    if (!currentUser) {
      setMyOrders([]);
      return;
    }
    
    try {
      const token = await getIdToken();
      const response = await axios.get(
        `${API_URL}/api/orders/user?userId=${currentUser.uid}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      if (response.data.success) {
        setMyOrders(response.data.data);
      }
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    }
  };

  // Fetch orders when user changes
  useEffect(() => {
    if (currentUser) {
      fetchOrders();
    } else {
      setMyOrders([]);
      setFavoriteItems([]);
    }
  }, [currentUser]);

  // Place order - move cart items to orders and save to backend
  const placeOrder = async (orderDetails) => {
    if (!currentUser) {
      alert('Please log in to place an order');
      throw new Error('User not logged in');
    }
    
    if (cartItems.length === 0) return null;

    const orderId = `ORD-${Date.now()}`;
    const orderData = {
      orderId,
      userId: currentUser.uid,  // Include user ID
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
      const token = await getIdToken();
      const response = await axios.post(
        `${API_URL}/api/orders/create`,
        orderData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      if (response.data.success) {
        // Add to local state
        setMyOrders((prevOrders) => [...prevOrders, response.data.order]);
        // Clear cart
        setCartItems([]);
        return response.data.order;
      }
    } catch (error) {
      console.error('Failed to place order:', error);
      throw error;
    }
  };

  // Update order status
  const updateOrderStatus = async (orderId, newStatus) => {
    if (!currentUser) return;
    
    try {
      const token = await getIdToken();
      const response = await axios.put(
        `${API_URL}/api/orders/status`,
        { orderId, status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      if (response.data.success) {
        // Update local state
        setMyOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.orderId === orderId ? { ...order, status: newStatus } : order
          )
        );
        
        // If completed or rejected, fetch updated orders
        if (newStatus === 'completed' || newStatus === 'rejected') {
          await fetchOrders();
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
    fetchOrders,
    fetchUserFavorites
  };

  return (
    <storeContext.Provider value={contextValue}>
      {props.children}
    </storeContext.Provider>
  );
};

export default StoreContextProvider;