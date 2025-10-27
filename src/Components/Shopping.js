import './Shopping.css';
import React from 'react';
import '../Cards/Meals.css';    
import { Heart, Star } from "lucide-react";
import { useState } from "react";   
import { Plus, Minus } from "lucide-react";
import {storeContext} from "../Contexts/storeContext";
import { useContext } from 'react';

function Shopping() {
  const shoppingBackgroundStyle = {
    backgroundImage: "url('https://images.unsplash.com/flagged/photo-1593005510509-d05b264f1c9c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmVkfGVufDB8fDB8fHww')"
  };
  
  // Get grubmart items from context
  const {grubmartMenu} = useContext(storeContext);
  
  // State for quantities and favorites - keyed by item ID
  const [quantities, setQuantities] = useState({});
  const [favorites, setFavorites] = useState({});

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

  const toggleFavorite = (itemId) => {
    setFavorites((prev) => ({
      ...prev,
      [itemId]: !prev[itemId]
    }));
  };

  return (
    <>
    <div className="full-page-background" style={shoppingBackgroundStyle}></div>
    <div className="page-content">
      <div className="delightmeals-cards-wrapper">
        <div className="slide-top">
          <div className='page-content-delightmeals'>
            {grubmartMenu && grubmartMenu.map((item) => (
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
                  <div>⏱️ {item.prepTime}</div>
                </div>
                
                <hr className='meals-horizontal-line'></hr>
                
                <div className='meals-card-price'> <b>Ksh {item.price}</b></div>
                
                <div className='meals-icons'>
                  <Heart 
                    size={16} 
                    fill={favorites[item.id] ? "#374151" : "none"}
                    stroke={favorites[item.id] ? "#374151" : "#9CA3AF"}
                    onClick={() => toggleFavorite(item.id)}
                    style={{ 
                      cursor: 'pointer',
                      color: favorites[item.id] ? "#374151" : "#9CA3AF",
                      transition: 'all 0.3s ease'
                    }}
                  />
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
                  <button onClick={() => increase(item.id)}>Grub it!</button>
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

export default Shopping;
