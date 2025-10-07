import react from 'react';
import React, { useEffect, useState } from "react";


const Profile = () => {
  const profileBackgroundStyle = {
    backgroundImage: "url('https://images.unsplash.com/flagged/photo-1593005510509-d05b264f1c9c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmVkfGVufDB8fDB8fHww')"
  };

  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch current user from backend
    fetch("https://ggbackend-1.onrender.com/auth/user", {
      credentials: "include", // send session cookie
    })
      .then(res => res.json())
      .then(data => {
        if (data.user) {
          setUser(data.user);
          localStorage.setItem("user", JSON.stringify(data.user));
        } else {
          window.location.href = "/login";
        }
      })
      .catch(err => console.error("Error fetching user:", err));
  }, []);

  const handleLogout = () => {
    fetch("https://ggbackend-1.onrender.com/auth/logout", {
      credentials: "include",
    }).then(() => {
      localStorage.removeItem("user");
      window.location.href = "/";
    });
  };

  return (
    <>
      <div className="full-page-background" style={profileBackgroundStyle}></div>
      <div className='page-content'>
    <div style={{
      textAlign: "center",
      padding: "2rem",
      fontFamily: "sans-serif",
    }}>
      {user ? (
        <>
          <img
            src={user.profilePic}
            alt="Profile"
            style={{
              width: "100px",
              height: "100px",
              borderRadius: "50%",
              marginBottom: "1rem",
            }}
          />
          <h2>{user.name}</h2>
          <p>{user.email}</p>
          <button
            onClick={handleLogout}
            style={{
              marginTop: "1rem",
              background: "#d9534f",
              color: "white",
              border: "none",
              padding: "0.6rem 1.2rem",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Logout
          </button>
        </>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
      </div>
    </>
  );
}

export default Profile;
