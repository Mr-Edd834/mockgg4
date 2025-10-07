import React from "react";
import { useNavigate } from "react-router-dom";
import authService from "../utils/auth";

/**
 * LogoutButton Component
 * 
 * A reusable logout button that can be used anywhere in your app.
 * 
 * Usage:
 * import LogoutButton from './LogoutButton';
 * 
 * <LogoutButton />
 * or
 * <LogoutButton className="my-custom-class" text="Sign Out" />
 */
const LogoutButton = ({ className = "", text = "Logout", style = {} }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear authentication data
    authService.logout();
    
    // Redirect to login page
    navigate("/login");
    
    console.log("User logged out successfully");
  };

  return (
    <button 
      onClick={handleLogout}
      className={`logout-button ${className}`}
      style={{
        padding: "10px 20px",
        background: "#ff4444",
        color: "white",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
        fontSize: "1rem",
        fontWeight: "600",
        transition: "all 0.3s ease",
        ...style
      }}
      onMouseOver={(e) => {
        e.target.style.background = "#cc0000";
        e.target.style.transform = "translateY(-2px)";
      }}
      onMouseOut={(e) => {
        e.target.style.background = "#ff4444";
        e.target.style.transform = "translateY(0)";
      }}
    >
      {text}
    </button>
  );
};

export default LogoutButton;

