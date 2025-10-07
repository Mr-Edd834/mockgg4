import axios from 'axios';

// For local development (ACTIVE)
const API_URL = 'http://localhost:5000/auth';

// For production on Render (uncomment when deploying):
// const API_URL = 'https://ggbackend-1.onrender.com/auth';

class AuthService {
  // Register new user
  async register(email, password, name) {
    try {
      const response = await axios.post(`${API_URL}/register`, {
        email,
        password,
        name
      });
      
      if (response.data.success && response.data.token) {
        this.setToken(response.data.token, false);
        this.setUser(response.data.user);
      }
      
      return response.data;
    } catch (error) {
      throw error.response?.data || { success: false, message: 'Registration failed' };
    }
  }

  // Login user
  async login(email, password, rememberMe = false) {
    try {
      const response = await axios.post(`${API_URL}/login`, {
        email,
        password,
        rememberMe
      });
      
      if (response.data.success && response.data.token) {
        this.setToken(response.data.token, rememberMe);
        this.setUser(response.data.user);
        
        // Store remember me preference
        if (rememberMe) {
          localStorage.setItem('gg_remember_me', 'true');
          localStorage.setItem('gg_saved_email', email);
        } else {
          localStorage.setItem('gg_remember_me', 'false');
          localStorage.removeItem('gg_saved_email');
        }
      }
      
      return response.data;
    } catch (error) {
      throw error.response?.data || { success: false, message: 'Login failed' };
    }
  }

  // Verify token
  async verifyToken() {
    try {
      const token = this.getToken();
      if (!token) {
        return { valid: false };
      }

      const response = await axios.get(`${API_URL}/verify`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      if (response.data.success && response.data.user) {
        this.setUser(response.data.user);
      }
      
      return response.data;
    } catch (error) {
      // Token is invalid or expired
      this.logout();
      return { valid: false };
    }
  }

  // Logout
  logout() {
    const rememberMe = localStorage.getItem('gg_remember_me') === 'true';
    
    // Clear token and user data
    localStorage.removeItem('gg_auth_token');
    sessionStorage.removeItem('gg_auth_token');
    localStorage.removeItem('gg_user');
    
    // Keep email if remember me is checked
    if (!rememberMe) {
      localStorage.removeItem('gg_saved_email');
      localStorage.removeItem('gg_remember_me');
    }
  }

  // Set token (localStorage for remember me, sessionStorage otherwise)
  setToken(token, rememberMe = false) {
    if (rememberMe) {
      localStorage.setItem('gg_auth_token', token);
      sessionStorage.removeItem('gg_auth_token');
    } else {
      sessionStorage.setItem('gg_auth_token', token);
      localStorage.removeItem('gg_auth_token');
    }
  }

  // Get token (check both localStorage and sessionStorage)
  getToken() {
    return localStorage.getItem('gg_auth_token') || sessionStorage.getItem('gg_auth_token');
  }

  // Set user data
  setUser(user) {
    localStorage.setItem('gg_user', JSON.stringify(user));
  }

  // Get user data
  getUser() {
    const userStr = localStorage.getItem('gg_user');
    return userStr ? JSON.parse(userStr) : null;
  }

  // Check if user is authenticated
  isAuthenticated() {
    return !!this.getToken();
  }

  // Get authorization header
  getAuthHeader() {
    const token = this.getToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
  }
}

const authService = new AuthService();

export default authService;

