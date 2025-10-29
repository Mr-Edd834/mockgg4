import React, { useState, useContext } from 'react';
import './Favorites.css';
import '../Cards/Meals.css';
import { Heart, Star, Clock, Trash2, Plus, Minus, HeartCrack } from "lucide-react";
import { storeContext } from "../Contexts/storeContext";

const Favorites = () => {
  const favoritesBackgroundStyle = {
    backgroundImage: "url('https://images.unsplash.com/flagged/photo-1593005510509-d05b264f1c9c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmVkfGVufDB8fDB8fHww')"
  };

  // Get favorites and functions from context
  const { favoriteItems, removeFromFavorites, addToCart } = useContext(storeContext);

  // State for quantities - keyed by item ID
  const [quantities, setQuantities] = useState({});

  // Utility function to limit description to 10 words
  const truncateDescription = (text, wordLimit = 10) => {
    const words = text.split(' ');
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(' ') + '...';
    }
    return text;
  };

  // Helper functions that work with item IDs
  const increase = (itemId) => {
    setQuantities((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1
    }));
  };

  const decrease = (itemId) => {
    setQuantities((prev) => ({
      ...prev,
      [itemId]: Math.max((prev[itemId] || 0) - 1, 0)
    }));
  };

  const handleGrubIt = (item) => {
    const currentQuantity = quantities[item.id] || 0;
    const quantityToAdd = currentQuantity === 0 ? 1 : currentQuantity;
    
    // Add to cart
    addToCart(item, quantityToAdd);
    
    // If quantity was 0, set it to 1, otherwise increment
    if (currentQuantity === 0) {
      setQuantities((prev) => ({
        ...prev,
        [item.id]: 1
      }));
    } else {
      // Increment the quantity for next click
      setQuantities((prev) => ({
        ...prev,
        [item.id]: currentQuantity + 1
      }));
    }
  };

  const handleRemoveFromFavorites = (itemId) => {
    removeFromFavorites(itemId);
    // Also clear the quantity for this item
    setQuantities((prev) => {
      const newQuantities = { ...prev };
      delete newQuantities[itemId];
      return newQuantities;
    });
  };

  return (
    <>
      <div className="full-page-background" style={favoritesBackgroundStyle}></div>
      
      <div className='page-content'>
        <div className="favorites-cards-wrapper">
          <div className="slide-top">
            <div className='page-content-favorites'>
              {/* Empty State */}
              {favoriteItems.length === 0 && (
                <div style={{ 
                  textAlign: 'center', 
                  padding: '100px 20px', 
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '20px'
                }}>
                  <HeartCrack size={100} color="#374151" />
                  <h2 style={{ 
                    fontSize: '24px', 
                    color: '#374151',
                    fontWeight: 'bold'
                  }}>
                    You don't have any favorites yet!
                  </h2>
                  <p style={{ 
                    fontSize: '16px', 
                    color: '#6b7280'
                  }}>
                    Start exploring and add items to your favorites ❤️
                  </p>
                </div>
              )}

              {/* Favorites Display */}
              {favoriteItems.map((item) => (
                <div key={item.id} className="MealsCard">
                  <img className='meals-card-image' src={item.image} alt={item.name} />
                  
                  <div className='meals-card-content'>
                    <div className='meals-card-title'> <b>{item.name}</b></div>
                  </div>
                  
                  <div className='meals-card-description'>{truncateDescription(item.description, 10)}</div>
                  
                  {/* Rating and Prep Time */}
                  <div className='rating-preptime-section'>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Star size={14} fill="#fbbf24" stroke="#fbbf24" />
                      <span>{item.rating}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Clock size={14} stroke="#6b7280" />
                      <span>{item.prepTime}</span>
                    </div>
                  </div>
                  
                  <hr className='meals-horizontal-line'></hr>
                  
                  <div className='meals-card-price'> <b>Ksh {item.price}</b></div>
                  
                  <div className='meals-icons'>
                    <button
                      onClick={() => handleRemoveFromFavorites(item.id)}
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        padding: '4px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        color: '#ef4444',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = '#dc2626';
                        e.currentTarget.style.transform = 'scale(1.1)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = '#ef4444';
                        e.currentTarget.style.transform = 'scale(1)';
                      }}
                    >
                      <Trash2 size={16} />
                    </button>
                    <div className='meals-counter'>
                      <button className='meals-counter-button' onClick={() => decrease(item.id)}>
                        <Minus size={16}/>
                      </button>
                      <span className="quantity">{quantities[item.id] || 0}</span>
                      <button className='meals-counter-button' onClick={() => increase(item.id)}>
                        <Plus size={16}/>
                      </button>
                    </div>
                  </div>
                  
                  <hr className='meals-horizontal-line'></hr>
                  
                  <div className='meals-order-button'>
                    <button onClick={() => handleGrubIt(item)}>Grub it!</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Favorites;
