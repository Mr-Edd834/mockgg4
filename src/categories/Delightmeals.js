
import './Delightmeals.css';
import React from 'react';
import '../Cards/Meals.css';    
import { Heart } from "lucide-react";
import { useState } from "react";   
import { Plus, Minus } from "lucide-react";


function Delightmeals() {
  const checkoutBackgroundStyle = {
    backgroundImage: "url('https://images.unsplash.com/flagged/photo-1593005510509-d05b264f1c9c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmVkfGVufDB8fDB8fHww')"
  };
  const [quantity, setQuantity] = useState(0);
  const [favorites, setFavorites] = useState({
    card1: false,
    card2: false,
    card3: false,
    card4: false,
    card5: false,
    card6: false
  });
  
  const increase = () => {
setQuantity((prev) => prev + 1);
};

const decrease = () => {
setQuantity((prev) => (prev > 0 ? prev - 1 : 0));
};
const toggleFavorite = (cardId) => {
   setFavorites((prev) => ({
     ...prev,
     [cardId]: !prev[cardId]
   }));
 };

  return (
    <>
    <div className="full-page-background" style={checkoutBackgroundStyle}></div>
    <div className="page-content">
      <div className="delightmeals-cards-wrapper">
        <div className="slide-top">
          <div className='page-content-delightmeals'>
            <div className="MealsCard">
        
            <img className='meals-card-image' src="https://images.unsplash.com/photo-1613082487279-1e16f1e81505?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZnJ1aXQlMjBzYWxhZHxlbnwwfHwwfHx8MA%3D%3D" alt=""></img>
            <div className='meals-card-content'>
               <div className='meals-card-title'> <b>Fruit Salad</b></div>
            </div>
            <div className='meals-card-description'>Get your favorite fruit salad at a discount today at GoGrub.</div>
               <hr className='meals-horizontal-line'></hr>
             <div className='meals-card-price'> <b>Ksh 500 </b></div>
            <div className='meals-icons'>
            <Heart 
             size={16} 
             fill={favorites.card1 ? "#374151" : "none"}
             stroke={favorites.card1 ? "#374151" : "#9CA3AF"}
             onClick={() => toggleFavorite('card1')}
             style={{ 
               cursor: 'pointer',
               color: favorites.card1 ? "#374151" : "#9CA3AF",
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
        
        <div className="MealsCard">
        
            <img className='meals-card-image' src="https://media.istockphoto.com/id/2175769249/photo/kenya-cuisines-dishes-food.webp?a=1&b=1&s=612x612&w=0&k=20&c=hzIEsUnxU-98cbP8NYwN1VzcT3yDI6m1awh5jCjY8kQ=" alt=""></img>
            <div className='meals-card-content'>
               <div className='meals-card-title'> <b>Chapati beef</b></div>
            </div>
            <div className='meals-card-description'>Get your favorite chapati beef at a discount today at GoGrub.</div>
               <hr className='meals-horizontal-line'></hr>
             <div className='meals-card-price'> <b>Ksh 200 </b></div>
            <div className='meals-icons'>
               <Heart 
             size={16} 
             fill={favorites.card2 ? "#374151" : "none"}
             stroke={favorites.card2 ? "#374151" : "#9CA3AF"}
             onClick={() => toggleFavorite('card2')}
             style={{ 
               cursor: 'pointer',
               color: favorites.card2 ? "#374151" : "#9CA3AF",
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
        
        <div className="MealsCard">
        
            <img className='meals-card-image' src="https://images.unsplash.com/photo-1634324092536-74480096b939?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGlsYXV8ZW58MHx8MHx8fDA%3D" alt=""></img>
            <div className='meals-card-content'>
               <div className='meals-card-title'> <b>Pilau Rice</b></div>
            </div>
            <div className='meals-card-description'>Get your favorite pilau rice at a discount today at GoGrub.</div>
               <hr className='meals-horizontal-line'></hr>
             <div className='meals-card-price'> <b>Ksh 300 </b></div>
            <div className='meals-icons'>
            <Heart 
             size={16} 
             fill={favorites.card3 ? "#374151" : "none"}
             stroke={favorites.card3 ? "#374151" : "#9CA3AF"}
             onClick={() => toggleFavorite('card3')}
             style={{ 
               cursor: 'pointer',
               color: favorites.card3 ? "#374151" : "#9CA3AF",
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
        
        <div className="MealsCard">
        
            <img className='meals-card-image' src="https://images.unsplash.com/photo-1600555379765-f82335a7b1b0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y29va2VkJTIwY2hpY2tlbnxlbnwwfHwwfHx8MA%3D%3D" alt=""></img>
            <div className='meals-card-content'>
               <div className='meals-card-title'> <b>Whole chicken</b></div>
            </div>
            <div className='meals-card-description'>Get your favorite whole chicken at a discount today at GoGrub.</div>
               <hr className='meals-horizontal-line'></hr>
             <div className='meals-card-price'> <b>Ksh 1000 </b></div>
            <div className='meals-icons'>
            <Heart 
             size={16} 
             fill={favorites.card4 ? "#374151" : "none"}
             stroke={favorites.card4 ? "#374151" : "#9CA3AF"}
             onClick={() => toggleFavorite('card4')}
             style={{ 
               cursor: 'pointer',
               color: favorites.card4 ? "#374151" : "#9CA3AF",
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
        
        <div className="MealsCard">
        
            <img className='meals-card-image' src="https://media.istockphoto.com/id/1464175219/photo/tilapia-stew-ugali-and-sukuma-wiki-kenyan-food.webp?a=1&b=1&s=612x612&w=0&k=20&c=l-JwfSbYWjKerL4agsXKT_46B1ljVxT7GbFSLK_625M=" alt=""></img>
            <div className='meals-card-content'>
               <div className='meals-card-title'> <b>Tilapia fish</b></div>
            </div>
            <div className='meals-card-description'>Get your favorite tilapia at a discount today at GoGrub.</div>
               <hr className='meals-horizontal-line'></hr>
             <div className='meals-card-price'> <b>Ksh 700 </b></div>
            <div className='meals-icons'>
            <Heart 
             size={16} 
             fill={favorites.card5 ? "#374151" : "none"}
             stroke={favorites.card5 ? "#374151" : "#9CA3AF"}
             onClick={() => toggleFavorite('card5')}
             style={{ 
               cursor: 'pointer',
               color: favorites.card5 ? "#374151" : "#9CA3AF",
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
        
        <div className="MealsCard">
        
            <img className='meals-card-image' src="https://images.unsplash.com/photo-1744116432654-574391dbe3ea?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGhlYWx0aHklMjBiYWxhbmNlZCUyMG1lYWxzfGVufDB8fDB8fHww" alt=""></img>
            <div className='meals-card-content'>
               <div className='meals-card-title'> <b>Avocado Special</b></div>
            </div>
            <div className='meals-card-description'>Get your favorite avocado-special  today at GoGrub.</div>
               <hr className='meals-horizontal-line'></hr>
             <div className='meals-card-price'> <b>Ksh 3000 </b></div>
            <div className='meals-icons'>
            <Heart 
             size={16} 
             fill={favorites.card6 ? "#374151" : "none"}
             stroke={favorites.card6 ? "#374151" : "#9CA3AF"}
             onClick={() => toggleFavorite('card6')}
             style={{ 
               cursor: 'pointer',
               color: favorites.card6 ? "#374151" : "#9CA3AF",
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
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default Delightmeals;
