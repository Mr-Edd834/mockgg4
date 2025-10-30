
import React from 'react';
import './App.css';

import Home from './Components/Home';
// import { animate } from 'animejs';

import Profile from './Components/Profile';

import Orderhistory from './Components/Orderhistory';
import Privatechef from './Components/Privatechef';
import Gas from './Components/Gas';
import Shopping from './Components/Shopping';


import Checkout from './Components/Checkout';
import Favorites from './Components/Favorites';
import Sidebar from './Components/Sidebar';
import BottomNavbar from './Components/BottomNavbar';
import Login from './Components/Login';
import Signup from './Components/Signup';
import ForgotPassword from './ForgotPassword';
import  Partner from './Components/Partner';


import { useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Myorder from './Components/Myorder';
import Delightmeals from './categories/Delightmeals';
import Fastfood from './categories/Fastfood';
import Snacks from './categories/Snacks';
import PlaceOrder from "./Components/PlaceOrder";
import ProtectedRoute from './Components/ProtectedRoute';

function App() {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const location = useLocation();
  const isLoginRoute = location.pathname === '/login';
  const isSignupRoute = location.pathname === '/signup';
  const isForgotPasswordRoute = location.pathname === '/forgot-password';
  const hideNavigation = isLoginRoute || isSignupRoute || isForgotPasswordRoute;

  return (
    <div className={`App ${hideNavigation ? 'login-mode' : ''}`}>
      {!hideNavigation && <Sidebar onToggle={setIsCollapsed} />}
      {!hideNavigation && <BottomNavbar />}
      <div className={`main-content ${hideNavigation ? 'no-spacing' : ''}`}>
        
        <Routes>
          {/* Public routes - accessible without login */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          
          {/* Public browsing - users can view products without login */}
          <Route path="/delightmeals" element={<Delightmeals />} />
          <Route path="/fastfood" element={<Fastfood />} />
          <Route path="/snacks" element={<Snacks />} />
          <Route path="/shopping" element={<Shopping />} />
          <Route path="/gas" element={<Gas />} />
          <Route path="/privatechef" element={<Privatechef />} /> 
          <Route path="/partner" element={<Partner />} />
          
          {/* Protected routes - require authentication */}
          <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/orderhistory" element={<ProtectedRoute><Orderhistory /></ProtectedRoute>} />
          <Route path="/myorder" element={<ProtectedRoute><Myorder /></ProtectedRoute>} />
          <Route path="/favorites" element={<ProtectedRoute><Favorites /></ProtectedRoute>} />
          <Route path="/placeorder" element={<ProtectedRoute><PlaceOrder /></ProtectedRoute>} />
        </Routes>
 
      </div>
    </div>
  );
}

export default App;


