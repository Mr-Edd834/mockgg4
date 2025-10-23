import react from 'react';
import React, { useEffect, useState } from "react";
import './Profile.css';
import { useAuth } from '../Contexts/AuthContext';
import { useNavigate } from "react-router-dom";



const Profile = () => {
  const profileBackgroundStyle = {
    backgroundImage: "url('https://images.unsplash.com/flagged/photo-1593005510509-d05b264f1c9c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmVkfGVufDB8fDB8fHww')"
  };

  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();
 const {currentUser, logout} = useAuth();
  useEffect(() => { 
    if (currentUser) {
      setUser(currentUser);
    }
  }, [currentUser]);
   async function handleLogout() {
    setError("");
    try{
         await logout();
         navigate("/login");
         alert("You have been logged out");

    }catch{
      setError("Failed to log out");
    }
  
  } 

 
  return (
    <>
      <div className="full-page-background" style={profileBackgroundStyle}></div>
      <div className='page-content'>
  
          <button className="profile-button" onClick={handleLogout}>Log Out</button>
        
        <div className='profile-details'>
          <h1>Profile</h1>
          {user && (
            <div>
              <p><strong>Name:</strong> {user.displayName || "N/A"}</p>
              <p><strong>Email:</strong> {user.email}</p>
            </div>
          )}
          </div> 
 
    </div>
    </>
  );
}

export default Profile;
