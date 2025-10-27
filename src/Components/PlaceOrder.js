import React from 'react'
import './PlaceOrder.css';
import { Banknote, CreditCard, Bitcoin } from "lucide-react";

const PlaceOrder = () => {
    const PlaceOrderBackgroundStyle = {
        backgroundImage: "url('https://images.unsplash.com/photo-1595757816291-ab4c1cba0fc2?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cmVkJTIwYmFja2dyb3VuZHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=500')"
      };
  return (
    <div className="placeorder-full-page-background" style={PlaceOrderBackgroundStyle}>
        <div className="placeorder-page-header">  
         <div className="location-input">
           <h2>Your Location:</h2>
           <input type="co-ordinates" placeholder="Enter your location" />
        </div>
<div className="phone-number-input">
    <h2>Your Payment Number:</h2>
    <input type="tel" placeholder="Enter your phone number" />
</div>

</div>
<div className="payment-method-container">
        <h1>Choose your payment method:</h1>
        <div className="payment-method-option">
                <Banknote size={24} color="#ffffff" />
                <p>M-pesa</p>
            </div>
            <div className="payment-method-option">
                <CreditCard size={24} color="#ffffff" />
                <p>Credit Card</p>
            </div>
            <div className="payment-method-option">
                <Bitcoin size={24} color="#ffffff" />
                <p>Crypto</p>
            </div>
            <div className="payment-method-option">
                <Banknote size={24} color="#ffffff" />
                <p>Cash</p>
            </div>
        </div>
        <button className="payment-button">Pay</button>
      </div>
  );
}

export default PlaceOrder;