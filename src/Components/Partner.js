import react from 'react';
import React, { useState } from "react";

const Partner = () => {
    const partnerBackgroundStyle = {
        backgroundImage: "url('https://images.unsplash.com/flagged/photo-1593005510509-d05b264f1c9c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmVkfGVufDB8fDB8fHww')"
      };
      const [formData, setFormData] = useState({
        companyName: "",
        directorName: "",
        companyEmail: "",
        phoneNumber: ""
      });
    
      const [message, setMessage] = useState("");
    
      const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("Submitting...");
    
        try {
          const res = await fetch("https://ggbackend-1.onrender.com/api/partners", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData)
          });
    
          const data = await res.json();
    
          if (res.ok) {
            setMessage("✅ Submitted successfully!");
            setFormData({
              companyName: "",
              directorName: "",
              companyEmail: "",
              phoneNumber: ""
            });
          } else {
            setMessage(`❌ ${data.error || "Something went wrong"}`);
          }
        } catch (err) {
          console.error(err);
          setMessage("❌ Network error");
        }
      };
    
  return (
    <>
 <div className="full-page-background" style={partnerBackgroundStyle}></div>
 <div className="grublink-container">
          <h2>Partner with GoGrub</h2>
          <form onSubmit={handleSubmit} className="grublink-form">
            <input
              type="text"
              name="companyName"
              placeholder="Name of Company/Business"
              value={formData.companyName}
              onChange={handleChange}
              required
            />
    
            <input
              type="text"
              name="directorName"
              placeholder="Name of Director"
              value={formData.directorName}
              onChange={handleChange}
              required
            />
    
            <input
              type="email"
              name="companyEmail"
              placeholder="Company Email"
              value={formData.companyEmail}
              onChange={handleChange}
              required
            />
    
            <input
              type="tel"
              name="phoneNumber"
              placeholder="Phone Number"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
    
            <button type="submit">Submit</button>
          </form>
    
          {message && <p className="status">{message}</p>}
        </div>
    </>
    
);
};

export default Partner;