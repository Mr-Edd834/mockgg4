import React, { useContext } from 'react';
import './Checkout.css';
import { Plus, Minus, Trash2, ShoppingCart } from "lucide-react";
import { storeContext } from "../Contexts/storeContext";
import { useNavigate } from 'react-router-dom';

function Checkout() {
  const checkoutBackgroundStyle = {
    backgroundImage: "url('https://images.unsplash.com/flagged/photo-1593005510509-d05b264f1c9c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmVkfGVufDB8fDB8fHww')"
  };

  const { cartItems, updateCartItemQuantity, removeFromCart, getCartTotal } = useContext(storeContext);
  const navigate = useNavigate();

  const handleIncrease = (item) => {
    updateCartItemQuantity(item.id, item.category, item.quantity + 1);
  };

  const handleDecrease = (item) => {
    const newQuantity = item.quantity - 1;
    if (newQuantity <= 0) {
      removeFromCart(item.id, item.category);
    } else {
      updateCartItemQuantity(item.id, item.category, newQuantity);
    }
  };

  const handleRemove = (item) => {
    removeFromCart(item.id, item.category);
  };

  const cartTotal = getCartTotal();
  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <>
      <div className="full-page-background" style={checkoutBackgroundStyle}></div>
      <div className='page-content'>
        <div className="checkout-page-content">
          <h1 className="checkout-header">Your Cart</h1>

          {cartItems.length === 0 ? (
            <div className="empty-cart-message">
              <div className="empty-cart-icon">🛒</div>
              <div className="empty-cart-text">Your cart is empty</div>
              <button 
                className="continue-shopping-btn"
                onClick={() => navigate('/')}
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <>
              <div className="checkout-items-container">
                {cartItems.map((item) => (
                  <div 
                    key={`${item.category}-${item.id}`} 
                    className="checkout-card-horizontal"
                  >
                    <div className="checkout-card-image-container">
                      <img 
                        className='checkout-card-image-horizontal' 
                        src={item.image} 
                        alt={item.name} 
                      />
                    </div>

                    <div className="checkout-card-details">
                      <h3 className="checkout-card-title-horizontal">{item.name}</h3>
                      <span className="checkout-card-category">{item.category}</span>
                      <div className="checkout-card-price-info">
                        <span className="unit-price">
                          Unit Price: <span className="unit-price-amount">Ksh {item.price.toLocaleString()}</span>
                        </span>
                      </div>
                    </div>

                    <div className="checkout-card-actions">
                      <div className="checkout-quantity-controls">
                        <button 
                          className='checkout-quantity-btn' 
                          onClick={() => handleDecrease(item)}
                        >
                          <Minus size={16}/>
                        </button>
                        <span className="checkout-quantity-display">{item.quantity}</span>
                        <button 
                          className='checkout-quantity-btn' 
                          onClick={() => handleIncrease(item)}
                        >
                          <Plus size={16}/>
                        </button>
                      </div>

                      <div className="checkout-total-price">
                        Ksh {(item.price * item.quantity).toLocaleString()}
                      </div>

                      <button 
                        className="checkout-remove-btn"
                        onClick={() => handleRemove(item)}
                      >
                        <Trash2 size={16} />
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="checkout-summary">
                <div className="checkout-summary-row">
                  <span className="checkout-summary-label">Total Items:</span>
                  <span className="checkout-summary-value">{itemCount}</span>
                </div>
                <div className="checkout-summary-row">
                  <span className="checkout-summary-label">Subtotal:</span>
                  <span className="checkout-summary-value">Ksh {cartTotal.toLocaleString()}</span>
                </div>
                <div className="checkout-summary-row checkout-grand-total">
                  <span className="checkout-summary-label">Grand Total:</span>
                  <span className="checkout-summary-value">Ksh {cartTotal.toLocaleString()}</span>
                </div>
              </div>

              <div className='pay-button'>
                <button>Proceed to Payment</button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Checkout;
