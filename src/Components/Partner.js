import React from 'react';
import './Partner.css'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



function Partner() { 
   const PartnerBackgroundStyle = {
    backgroundImage: "url('https://images.unsplash.com/photo-1595757816291-ab4c1cba0fc2?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cmVkJTIwYmFja2dyb3VuZHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=500')"
  };
   const handleSubmit = (e) => {
    e.preventDefault();

    // Simulate success
    toast.success(" Partnership form submitted successfully!", {
      position: "bottom-right",
      autoClose: 1000,
      hideProgressBar: true,
      theme: "dark",
      userSelect: "none",
    });
  };

  return (
    <>
     <div className="partner-full-page-background" style={PartnerBackgroundStyle}>
    <div className="partner-page">
        <div className="partner-header">
      <h2>Become a Partner</h2>
      <p>Fill out the forms below to partner with us today!</p>
        </div>
      <div className="partner-forms">
        <form className="partner-form">
          <h3>Company name:</h3>
          <input type="text" placeholder="company name" required />
           <h3>Company Email:</h3>
          <input type="email" placeholder="company email" required />
          <h3>Company Director:</h3>
          <input type="text" placeholder="Name of Director" required />
          <h3>Directors contact:</h3>
          <input type="tel" placeholder="Phone Number" required />
          <h3>Company description:</h3>
          <textarea placeholder="company Description" required>

          </textarea>
          <button type="submit"
          onClick={handleSubmit}
          >Submit Partnership form</button>
        </form>     
      </div>
    </div>
  </div>

  
      {/* Toast Container */}
      <ToastContainer />
    </>
  );
}

export default Partner;