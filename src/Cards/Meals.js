import React from 'react';
import './Meals.css';    
import { Heart } from "lucide-react";
import { useState } from "react";   
import { Plus, Minus } from "lucide-react";

function MealsCard(){
 const [quantity, setQuantity] = useState(0);
 const [isFavorited, setIsFavorited] = useState(false);

      const increase = () => {
    setQuantity((prev) => prev + 1);
  };

  const decrease = () => {
    setQuantity((prev) => (prev > 0 ? prev - 1 : 0));
  };

  const toggleFavorite = () => {
    setIsFavorited((prev) => !prev);
  };

    return(
        <>
        <div className="MealsCard">
        
            <img className='meals-card-image' src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Zm9vZHxlbnwwfHwwfHx8MA%3D%3D" alt=""></img>
            <div className='meals-card-content'>
               <div className='meals-card-title'> <b>Large pizza</b></div>
            </div>
            <div className='meals-card-description'>Get your favorite pizza big at a discount today at GoGrub.</div>
               <hr className='meals-horizontal-line'></hr>
             <div className='meals-card-price'> <b>Ksh 2000 </b></div>
            <div className='meals-icons'>
            <Heart 
              size={16} 
              fill={isFavorited ? "#374151" : "none"}
              stroke={isFavorited ? "#374151" : "#9CA3AF"}
              onClick={toggleFavorite}
              style={{ 
                cursor: 'pointer',
                color: isFavorited ? "#374151" : "#9CA3AF",
                transition: 'all 0.3s ease'
              }}
            />
            <div className='meals-counter'>
                <button className='meals-counter-button' onClick={decrease}><Minus size={16}/></button>
                 <span className="quantity">{quantity}</span>
                <button className='meals-counter-button' onClick={increase}><Plus size={16}/></button>
                </div>
            </div>
            <hr className='meals-horizontal-line'></hr>
            <div className='meals-order-button'>
               <button>Grub it!</button>
            </div>
        </div>
        
</>
    )
}

export default MealsCard;