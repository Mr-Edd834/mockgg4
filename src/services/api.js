import axios from 'axios';

// Backend URL from environment variable
const API_URL = process.env.REACT_APP_API_URL;

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Product API endpoints
export const productAPI = {
  /**
   * Fetch all products from the backend
   * @returns {Promise<Array>} Array of product objects
   */
  listProducts: async () => {
    try {
      const response = await api.get('/api/food/list');
      
      if (response.data.success) {
        // Transform backend data to match frontend format
        const products = response.data.data.map(item => ({
          id: item._id,  // MongoDB uses _id, we map it to id
          name: item.name,
          description: item.description,
          price: item.price,
          category: item.category,
          image: `${API_URL}/images/${item.image}`, // Full image URL
          prepTime: item.prepTime || '--', // Use actual prepTime from database, show -- if not set
          // Add default values for fields not in database
          rating: item.rating || 4.5
        }));
        
        return products;
      } else {
        throw new Error('Failed to fetch products');
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  },

  /**
   * Fetch products filtered by category
   * @param {string} category - Category name (DelightMeals, Fastfood, Snacks, GrubMart)
   * @returns {Promise<Array>} Filtered array of products
   */
  listProductsByCategory: async (category) => {
    try {
      const allProducts = await productAPI.listProducts();
      return allProducts.filter(product => product.category === category);
    } catch (error) {
      console.error(`Error fetching products for category ${category}:`, error);
      throw error;
    }
  },

  /**
   * Get image URL for a product
   * @param {string} filename - Image filename
   * @returns {string} Full image URL
   */
  getImageURL: (filename) => {
    return `${API_URL}/images/${filename}`;
  },
};

// Order API endpoints
export const orderAPI = {
  /**
   * Create a new order
   * @param {Object} orderData - Order details
   * @returns {Promise<Object>} Created order
   */
  createOrder: async (orderData) => {
    try {
      const response = await api.post('/api/orders/create', orderData);
      return response.data;
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  },

  /**
   * Get all orders (for admin)
   * @returns {Promise<Array>} List of all orders
   */
  listOrders: async () => {
    try {
      const response = await api.get('/api/orders/list');
      return response.data;
    } catch (error) {
      console.error('Error fetching orders:', error);
      throw error;
    }
  },

  /**
   * Get active orders
   * @returns {Promise<Array>} List of active orders
   */
  getActiveOrders: async () => {
    try {
      const response = await api.get('/api/orders/active');
      return response.data;
    } catch (error) {
      console.error('Error fetching active orders:', error);
      throw error;
    }
  },

  /**
   * Get completed orders
   * @returns {Promise<Array>} List of completed orders
   */
  getCompletedOrders: async () => {
    try {
      const response = await api.get('/api/orders/completed');
      return response.data;
    } catch (error) {
      console.error('Error fetching completed orders:', error);
      throw error;
    }
  },

  /**
   * Update order status
   * @param {String} orderId - Order ID
   * @param {String} status - New status
   * @returns {Promise<Object>} Updated order
   */
  updateOrderStatus: async (orderId, status) => {
    try {
      const response = await api.put('/api/orders/status', { orderId, status });
      return response.data;
    } catch (error) {
      console.error('Error updating order status:', error);
      throw error;
    }
  }
};

export default api;

