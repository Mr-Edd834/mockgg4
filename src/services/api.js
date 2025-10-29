import axios from 'axios';

// Backend URL from environment variable
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

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
          prepTime: item.prepTime || 'N/A', // Use actual prepTime from database
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

export default api;

