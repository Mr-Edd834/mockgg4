import React, { useState, useEffect, useRef } from "react";
import {
  LayoutDashboard,
  Heart,
  ClipboardList,
  ShoppingBasket,
  Settings,
  Bike,
} from "lucide-react"; // <-- icon pack
import "./Sidebar.css";
import { Link } from "react-router-dom";

const Sidebar = ({ onToggle }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [activeItem, setActiveItem] = useState("dashboard");
  const sidebarRef = useRef(null);
  

  const menuItems = [
    { id: "dashboard", icon: <LayoutDashboard size={24} />, label: "Dashboard",path:"/" },
     { id: "favorite", icon: <Heart size={24} />, label: "Favorite",path:"/favorites" },
      { id: "bills", icon: <ShoppingBasket size={24} />, label: "Checkout", path:"/checkout" },
    { id: "food-order", icon: <Bike size={24} />, label: "My Order",path:"/myorder" },
   
    { id: "order-history", icon: <ClipboardList size={24} />, label: "Order History",path:"/orderhistory" },
  
    { id: "setting", icon: <Settings size={24} />, label: "Settings",path:"/profile" },
  ];


  const toggleSidebar = () => {
    const newState = !isCollapsed;
    setIsCollapsed(newState);
    onToggle(newState);
  };

  const handleIconClick = (itemId) => {
    if (isCollapsed) {
      setActiveItem(itemId);
      setIsCollapsed(false);
      onToggle(false);
    } else {
      if (activeItem === itemId) {
        setIsCollapsed(true);
        onToggle(true);
      } else {
        setActiveItem(itemId);
      }
    }
  };

  // Click outside to close functionality
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Only close if sidebar is expanded and click is outside the sidebar
      if (!isCollapsed && sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsCollapsed(true);
        onToggle(true);
      }
    };

    // Add event listener when sidebar is expanded
    if (!isCollapsed) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    // Cleanup event listener
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isCollapsed, onToggle]);

  return (
    <div className="sidebar-container" ref={sidebarRef}>
      {isCollapsed ? (
        /* Collapsed Sidebar */
        <div className="sidebar-collapsed">
          <div className="sidebar-header">
            <button className="toggle-btn" onClick={toggleSidebar}>
              →
            </button>
          </div>
          <div className="sidebar-menu">
            {menuItems.map((item) => (
              <div
                key={item.id}
                className={`menu-item ${activeItem === item.id ? "active" : ""}`}
                onClick={() => handleIconClick(item.id)}
              >
                <Link to={item.path} >
                <span className="menu-icon">{item.icon}</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Expanded Sidebar */
        <div className="sidebar-expanded">
          <div className="sidebar-header">
            <h2>GOGRUB</h2>
            <button className="toggle-btn" onClick={toggleSidebar}>
              ←
            </button>
          </div>
          <div className="sidebar-menu">
            {menuItems.map((item) => (
              <div
                key={item.id}
                className={`menu-item ${activeItem === item.id ? "active" : ""}`}
                onClick={() => handleIconClick(item.id)}
              >
              <Link to={item.path} >
                <span className="menu-icon">{item.icon}</span>
                <span className="menu-label">{item.label}</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
