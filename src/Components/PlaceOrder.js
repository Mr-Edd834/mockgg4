import React, { useState, useContext } from 'react'
import './PlaceOrder.css';
import { Banknote, CreditCard, Bitcoin } from "lucide-react";
import { storeContext } from "../Contexts/storeContext";
import { useNavigate } from 'react-router-dom';

const PlaceOrder = () => {
    const { placeOrder, cartItems } = useContext(storeContext);
    const navigate = useNavigate();
    
    const [selectedPayment, setSelectedPayment] = useState('');
    const [location, setLocation] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [cardDetails, setCardDetails] = useState({
      cardNumber: '',
      cardName: '',
      expiryDate: '',
      cvv: ''
    });

    const PlaceOrderBackgroundStyle = {
        backgroundImage: "url('https://images.unsplash.com/photo-1595757816291-ab4c1cba0fc2?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cmVkJTIwYmFja2dyb3VuZHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=500')"
    };

    const handlePaymentSelect = (method) => {
      // Toggle credit card dropdown if clicking it again
      if (method === 'card' && selectedPayment === 'card') {
        setSelectedPayment('');
      } else {
        setSelectedPayment(method);
      }
    };

    const handleCardInputChange = (e) => {
      const { name, value } = e.target;
      
      // Format card number with spaces
      if (name === 'cardNumber') {
        const formatted = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
        setCardDetails({ ...cardDetails, [name]: formatted.slice(0, 19) });
      }
      // Format expiry date
      else if (name === 'expiryDate') {
        const formatted = value.replace(/\D/g, '').replace(/(\d{2})(\d{0,2})/, '$1/$2');
        setCardDetails({ ...cardDetails, [name]: formatted.slice(0, 5) });
      }
      // Format CVV
      else if (name === 'cvv') {
        setCardDetails({ ...cardDetails, [name]: value.replace(/\D/g, '').slice(0, 3) });
      }
      else {
        setCardDetails({ ...cardDetails, [name]: value });
      }
    };

    const handlePay = async () => {
      // Validation
      if (!location.trim()) {
        alert('Please enter your delivery location');
        return;
      }
      if (!phoneNumber.trim()) {
        alert('Please enter your phone number');
        return;
      }
      if (!selectedPayment) {
        alert('Please select a payment method');
        return;
      }
      if (selectedPayment === 'card') {
        if (!cardDetails.cardNumber || !cardDetails.cardName || !cardDetails.expiryDate || !cardDetails.cvv) {
          alert('Please fill in all card details');
          return;
        }
      }
      if (cartItems.length === 0) {
        alert('Your cart is empty');
        navigate('/checkout');
        return;
      }

      setIsSubmitting(true);

      try {
        const orderDetails = {
          location: location.trim(),
          phoneNumber: phoneNumber.trim(),
          paymentMethod: selectedPayment
        };

        await placeOrder(orderDetails);
        
        alert('Order placed successfully! 🎉');
        navigate('/myorders');
      } catch (error) {
        console.error('Error placing order:', error);
        alert('Failed to place order. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
    };

    return (
      <div className="placeorder-full-page-background" style={PlaceOrderBackgroundStyle}>
        <div className="placeorder-page-header">  
         <div className="location-input">
           <h2>Your Location:</h2>
           <input 
             type="text" 
             placeholder="Enter your location" 
             value={location}
             onChange={(e) => setLocation(e.target.value)}
           />
        </div>
        <div className="phone-number-input">
            <h2>Your Phone Number:</h2>
            <input 
              type="tel" 
              placeholder="Enter your phone number" 
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
        </div>
        </div>

        <div className="payment-method-container">
            <h1>Choose your payment method:</h1>
            <div 
              className={`payment-method-option ${selectedPayment === 'mpesa' ? 'selected' : ''}`}
              onClick={() => handlePaymentSelect('mpesa')}
            >
                <Banknote size={24} color="#ffffff" />
                <p>M-pesa</p>
            </div>
            <div 
              className={`payment-method-option ${selectedPayment === 'card' ? 'selected' : ''}`}
              onClick={() => handlePaymentSelect('card')}
            >
                <CreditCard size={24} color="#ffffff" />
                <p>Credit Card</p>
            </div>

            {/* Card Details Dropdown - appears below Credit Card button */}
            {selectedPayment === 'card' && (
              <div className="card-details-dropdown">
                <h3>Enter Card Details</h3>
                <div className="card-form">
                  <div className="card-input-full">
                    <label>Card Number</label>
                    <input 
                      type="text" 
                      name="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      value={cardDetails.cardNumber}
                      onChange={handleCardInputChange}
                      maxLength="19"
                    />
                  </div>

                  <div className="card-input-full">
                    <label>Cardholder Name</label>
                    <input 
                      type="text" 
                      name="cardName"
                      placeholder="JOHN DOE"
                      value={cardDetails.cardName}
                      onChange={handleCardInputChange}
                      style={{ textTransform: 'uppercase' }}
                    />
                  </div>

                  <div className="card-input-row">
                    <div className="card-input-half">
                      <label>Expiry Date</label>
                      <input 
                        type="text" 
                        name="expiryDate"
                        placeholder="MM/YY"
                        value={cardDetails.expiryDate}
                        onChange={handleCardInputChange}
                        maxLength="5"
                      />
                    </div>

                    <div className="card-input-half">
                      <label>CVV</label>
                      <input 
                        type="text" 
                        name="cvv"
                        placeholder="123"
                        value={cardDetails.cvv}
                        onChange={handleCardInputChange}
                        maxLength="3"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div 
              className={`payment-method-option ${selectedPayment === 'crypto' ? 'selected' : ''}`}
              onClick={() => handlePaymentSelect('crypto')}
            >
                <Bitcoin size={24} color="#ffffff" />
                <p>Crypto</p>
            </div>
            <div 
              className={`payment-method-option ${selectedPayment === 'cash' ? 'selected' : ''}`}
              onClick={() => handlePaymentSelect('cash')}
            >
                <Banknote size={24} color="#ffffff" />
                <p>Cash</p>
            </div>
        </div>
        <button 
          className="payment-button" 
          onClick={handlePay}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Processing...' : 'Pay'}
        </button>
      </div>
    );
}

export default PlaceOrder;
