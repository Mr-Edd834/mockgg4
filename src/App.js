
import React from 'react';
import './App.css';

import Home from './Components/Home';
import { animate } from 'animejs';

import Profile from './Components/Profile';

import Orderhistory from './Components/Orderhistory';
import Privatechef from './Components/Privatechef';
import Gas from './Components/Gas';
import Shopping from './Components/Shopping';


import Checkout from './Components/Checkout';
import Favorites from './Components/Favorites';
import Sidebar from './Components/Sidebar';
import Login from './Components/Login';
import Signup from './Components/Signup';



import { useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Myorder from './Components/Myorder';
import Delightmeals from './categories/Delightmeals';
import Fastfood from './categories/Fastfood';
import Snacks from './categories/Snacks';
import ProtectedRoute from "./Components/ProtectedRoute";

function App() {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const location = useLocation();
  const isLoginRoute = location.pathname === '/login';
  const isSignupRoute = location.pathname === '/signup';
  const hideNavigation = isLoginRoute || isSignupRoute;

  return (
    
    <div className={`App ${hideNavigation ? 'login-mode' : ''}`}>
      {!hideNavigation && <Sidebar onToggle={setIsCollapsed} />}
      <div className={`main-content ${hideNavigation ? 'no-spacing' : ''}`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/orderhistory" element={<Orderhistory />} />
          <Route path="/myorder" element={<Myorder />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/delightmeals" element={<Delightmeals />} />
          <Route path="/fastfood" element={<Fastfood />} />
          <Route path="/snacks" element={<Snacks />} />
          <Route path="/gas" element={<Gas />} />
         <Route path="/privatechef" element={<Privatechef />} /> 
          <Route path="/shopping" element={<Shopping/>} />

             {/* Protected routes */}
        <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
        <Route path="/myorder" element={<ProtectedRoute><Myorder /></ProtectedRoute>} />
        <Route path="/orderhistory" element={<ProtectedRoute><Orderhistory /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        </Routes>
      </div>
    </div>
  );
  // in App.js
  console.log("Force rebuild", new Date());
}

export default App;


