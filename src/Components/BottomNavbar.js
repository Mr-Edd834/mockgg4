import React, { useState, useEffect } from "react";
import {
  LayoutDashboard,
  Heart,
  ClipboardList,
  ShoppingBasket,
  Settings,
  Bike,
} from "lucide-react";
import "./BottomNavbar.css";
import { Link, useLocation } from "react-router-dom";

const BottomNavbar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const location = useLocation();

  const menuItems = [
    { id: "dashboard", icon: <LayoutDashboard size={24} />, path: "/" },
    { id: "favorite", icon: <Heart size={24} />, path: "/favorites" },
    { id: "checkout", icon: <ShoppingBasket size={24} />, path: "/checkout" },
    { id: "myorder", icon: <Bike size={24} />, path: "/myorder" },
    { id: "history", icon: <ClipboardList size={24} />, path: "/orderhistory" },
    { id: "settings", icon: <Settings size={24} />, path: "/profile" },
  ];

  // Scroll detection to show/hide navbar
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;

          if (currentScrollY < lastScrollY) {
            // Scrolling UP → Show navbar
            setIsVisible(true);
          } else if (currentScrollY > lastScrollY && currentScrollY > 50) {
            // Scrolling DOWN (after 50px) → Hide navbar
            setIsVisible(false);
          }

          setLastScrollY(currentScrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <nav className={`bottom-navbar ${isVisible ? "visible" : "hidden"}`}>
      {menuItems.map((item) => (
        <Link 
          key={item.id} 
          to={item.path} 
          className="nav-item-link"
        >
          <div 
            className={`nav-item ${location.pathname === item.path ? "active" : ""}`}
          >
            <span className="nav-icon">
              {item.icon}
              {item.id === "checkout" && <span className="cart-dot"></span>}
            </span>
          </div>
        </Link>
      ))}
    </nav>
  );
};

export default BottomNavbar;

