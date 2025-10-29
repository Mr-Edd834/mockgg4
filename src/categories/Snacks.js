import React, { useState, useContext } from 'react';
import './Snacks.css';
import '../Cards/Meals.css';
import { Heart, Star, Plus, Minus, Clock } from "lucide-react";
import { storeContext } from '../Contexts/storeContext';

function Snacks() {
  const checkoutBackgroundStyle = {
    backgroundImage: "url('https://images.unsplash.com/flagged/photo-1593005510509-d05b264f1c9c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmVkfGVufDB8fDB8fHww')"
  };

  // Get snack menu and cart functions from context
  const { snackFoodMenu, addToCart, loading, error, toggleFavorite, isInFavorites } = useContext(storeContext);

  // State for quantities - keyed by meal ID
  const [quantities, setQuantities] = useState({});

  // Utility function to limit description to 10 words
  const truncateDescription = (text, wordLimit = 10) => {
    const words = text.split(' ');
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(' ') + '...';
    }
    return text;
  };

  // Helper functions that work with meal IDs
  const increase = (mealId) => {
    setQuantities((prev) => ({
      ...prev,
      [mealId]: (prev[mealId] || 0) + 1
    }));
  };

  const decrease = (mealId) => {
    setQuantities((prev) => ({
      ...prev,
      [mealId]: Math.max((prev[mealId] || 0) - 1, 0)
    }));
  };

  const handleGrubIt = (meal) => {
    const currentQuantity = quantities[meal.id] || 0;
    const quantityToAdd = currentQuantity === 0 ? 1 : currentQuantity;
    
    // Add to cart
    addToCart(meal, quantityToAdd);
    
    // If quantity was 0, set it to 1, otherwise increment
    if (currentQuantity === 0) {
      setQuantities((prev) => ({
        ...prev,
        [meal.id]: 1
      }));
    } else {
      // Increment the quantity for next click
      setQuantities((prev) => ({
        ...prev,
        [meal.id]: currentQuantity + 1
      }));
    }
  };

  return (
    <>
    <div className="full-page-background" style={checkoutBackgroundStyle}></div>
    <div className="page-content">
      <div className="snacks-cards-wrapper">
        <div className="slide-top">
          <div className='page-content-snacks'>
            {/* Loading State */}
            {loading && (
              <div style={{ 
                textAlign: 'center', 
                padding: '50px', 
                fontSize: '18px',
                color: '#374151',
                width: '100%'
              }}>
                <div style={{ fontSize: '24px', marginBottom: '10px' }}>🍿</div>
                Loading snacks...
              </div>
            )}

            {/* Error State */}
            {error && !loading && (
              <div style={{ 
                textAlign: 'center', 
                padding: '50px', 
                fontSize: '18px',
                color: '#ef4444',
                width: '100%',
                backgroundColor: '#fee2e2',
                borderRadius: '8px',
                margin: '20px'
              }}>
                <div style={{ fontSize: '24px', marginBottom: '10px' }}>⚠️</div>
                {error}
              </div>
            )}

            {/* Products Display */}
            {!loading && !error && snackFoodMenu && snackFoodMenu.map((meal) => (
              <div key={meal.id} className="MealsCard">
                <img className='meals-card-image' src={meal.image} alt={meal.name} />
                
                <div className='meals-card-content'>
                  <div className='meals-card-title'> <b>{meal.name}</b></div>
                </div>
                
                <div className='meals-card-description'>{truncateDescription(meal.description, 10)}</div>
                
                {/* Rating and Prep Time */}
                <div className='rating-preptime-section'>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Star size={14} fill="#fbbf24" stroke="#fbbf24" />
                    <span>{meal.rating}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Clock size={14} stroke="#6b7280" />
                    <span>{meal.prepTime}</span>
                  </div>
                </div>
                
                <hr className='meals-horizontal-line'></hr>
                
                <div className='meals-card-price'> <b>Ksh {meal.price}</b></div>
                
                <div className='meals-icons'>
                  <Heart 
                    size={16} 
                    fill={isInFavorites(meal.id) ? "#374151" : "none"}
                    stroke={isInFavorites(meal.id) ? "#374151" : "#9CA3AF"}
                    onClick={() => toggleFavorite(meal)}
                    style={{ 
                      cursor: 'pointer',
                      color: isInFavorites(meal.id) ? "#374151" : "#9CA3AF",
                      transition: 'all 0.3s ease'
                    }}
                  />
                  <div className='meals-counter'>
                    <button className='meals-counter-button' onClick={() => decrease(meal.id)}>
                      <Minus size={16}/>
                    </button>
                    <span className="quantity">{quantities[meal.id] || 0}</span>
                    <button className='meals-counter-button' onClick={() => increase(meal.id)}>
                      <Plus size={16}/>
                    </button>
                  </div>
                </div>
                
                <hr className='meals-horizontal-line'></hr>
                
                <div className='meals-order-button'>
                  <button onClick={() => handleGrubIt(meal)}>Grub it!</button>
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

export default Snacks;
