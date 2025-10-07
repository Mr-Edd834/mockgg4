import react from 'react';  
// import { HeartCrack } from "lucide-react";
// import SplitText from "../Animations/SplitText";
import './Favorites.css';
import { Heart } from "lucide-react";
import { Plus, Minus } from "lucide-react";
import { MoreVertical } from "lucide-react";
import { useState } from "react";   
import React from 'react';
import '../Cards/FavoritesCard.css';

const Favorites = () => {
  const favoritesBackgroundStyle = {
    backgroundImage: "url('https://images.unsplash.com/flagged/photo-1593005510509-d05b264f1c9c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmVkfGVufDB8fDB8fHww')"
  };
  const [quantity, setQuantity] = useState(0);

  const increase = () => {
setQuantity((prev) => prev + 1);
};

const decrease = () => {
setQuantity((prev) => (prev > 0 ? prev - 1 : 0));
};

  // const handleAnimationComplete = () => {
  //   console.log('All letters have animated!');
  // };
  return (
    <>
      <div className="full-page-background" style={favoritesBackgroundStyle}></div>
     
      <div className='favorites-content'>
      <div className="favorites-card">
       
            <img className='favorites-card-image' src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Zm9vZHxlbnwwfHwwfHx8MA%3D%3D" alt="" ></img>
            <div className='favorites-card-content'>
               <div className='favorites-card-title'> <b>Large pizza</b></div>
                <MoreVertical size={24}color="black" className="drop-icon"/>
            </div>
            <div className='favorites-card-description'>Get your favorite pizza big at a discount today at GoGrub.</div>
               <hr className='favorites-horizontal-line'></hr>
             <div className='favorites-card-price'> <b>Ksh 2000 </b></div>
            <div className='favorites-icons'>
            <Heart size={16} colour="dark-gray"/>
            <div className='favorites-counter'>
                <button className='favorites-counter-button' onClick={decrease}><Minus size={16}/></button>
                 <span className="favorites-quantity">{quantity}</span>
                <button className='favorites-counter-button' onClick={increase}><Plus size={16}/></button>
                </div>
            </div>
            <hr className='favorites-horizontal-line'></hr>
            <div className='favorites-order-button'>
               <button>Grub it!</button>
            </div>
        </div>
        
        <div className="favorites-card">
       
       <img className='favorites-card-image' src="https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YnVyZ2VyfGVufDB8fDB8fHww" alt="" ></img>
       <div className='favorites-card-content'>
          <div className='favorites-card-title'> <b>Big Belly Burger</b></div>
           <MoreVertical size={24}color="black" className="drop-icon"/>
       </div>
       <div className='favorites-card-description'>Get your favorite big burger at a discount today at GoGrub.</div>
          <hr className='favorites-horizontal-line'></hr>
        <div className='favorites-card-price'> <b>Ksh 2000 </b></div>
       <div className='favorites-icons'>
       <Heart size={16} colour="dark-gray"/>
       <div className='favorites-counter'>
           <button className='favorites-counter-button' onClick={decrease}><Minus size={16}/></button>
            <span className="favorites-quantity">{quantity}</span>
           <button className='favorites-counter-button' onClick={increase}><Plus size={16}/></button>
           </div>
       </div>
       <hr className='favorites-horizontal-line'></hr>
       <div className='favorites-order-button'>
          <button>Grub it!</button>
       </div>
   </div>
   
   <div className="favorites-card">
      
      <img className='favorites-card-image' src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Zm9vZHxlbnwwfHwwfHx8MA%3D%3D" alt="" ></img>
      <div className='favorites-card-content'>
         <div className='favorites-card-title'> <b>Large pizza</b></div>
          <MoreVertical size={24}color="black" className="drop-icon"/>
      </div>
      <div className='favorites-card-description'>Get your favorite pizza big at a discount today at GoGrub.</div>
         <hr className='favorites-horizontal-line'></hr>
       <div className='favorites-card-price'> <b>Ksh 2000 </b></div>
      <div className='favorites-icons'>
      <Heart size={16} colour="dark-gray"/>
      <div className='favorites-counter'>
          <button className='favorites-counter-button' onClick={decrease}><Minus size={16}/></button>
           <span className="favorites-quantity">{quantity}</span>
          <button className='favorites-counter-button' onClick={increase}><Plus size={16}/></button>
          </div>
      </div>
      <hr className='favorites-horizontal-line'></hr>
      <div className='favorites-order-button'>
         <button>Grub it!</button>
      </div>
  </div>
  
  <div className="favorites-card">
     
     <img className='favorites-card-image' src="https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YnVyZ2VyfGVufDB8fDB8fHww" alt="" ></img>
     <div className='favorites-card-content'>
        <div className='favorites-card-title'> <b>Big Belly Burger</b></div>
         <MoreVertical size={24}color="black" className="drop-icon"/>
     </div>
     <div className='favorites-card-description'>Get your favorite big burger at a discount today at GoGrub.</div>
        <hr className='favorites-horizontal-line'></hr>
      <div className='favorites-card-price'> <b>Ksh 2000 </b></div>
     <div className='favorites-icons'>
     <Heart size={16} colour="dark-gray"/>
     <div className='favorites-counter'>
         <button className='favorites-counter-button' onClick={decrease}><Minus size={16}/></button>
          <span className="favorites-quantity">{quantity}</span>
         <button className='favorites-counter-button' onClick={increase}><Plus size={16}/></button>
         </div>
     </div>
     <hr className='favorites-horizontal-line'></hr>
     <div className='favorites-order-button'>
        <button>Grub it!</button>
     </div>
 </div>
 
 <div className="favorites-card">
    
    <img className='favorites-card-image' src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Zm9vZHxlbnwwfHwwfHx8MA%3D%3D" alt="" ></img>
    <div className='favorites-card-content'>
       <div className='favorites-card-title'> <b>Large pizza</b></div>
        <MoreVertical size={24}color="black" className="drop-icon"/>
    </div>
    <div className='favorites-card-description'>Get your favorite pizza big at a discount today at GoGrub.</div>
       <hr className='favorites-horizontal-line'></hr>
    <div className='favorites-card-price'> <b>Ksh 2000 </b></div>
   <div className='favorites-icons'>
   <Heart size={16} colour="dark-gray"/>
   <div className='favorites-counter'>
       <button className='favorites-counter-button' onClick={decrease}><Minus size={16}/></button>
        <span className="favorites-quantity">{quantity}</span>
       <button className='favorites-counter-button' onClick={increase}><Plus size={16}/></button>
       </div>
   </div>
   <hr className='favorites-horizontal-line'></hr>
   <div className='favorites-order-button'>
      <button>Grub it!</button>
   </div>
</div>

<div className="favorites-card">
   
   <img className='favorites-card-image' src="https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YnVyZ2VyfGVufDB8fDB8fHww" alt="" ></img>
   <div className='favorites-card-content'>
      <div className='favorites-card-title'> <b>Big Belly Burger</b></div>
       <MoreVertical size={24}color="black" className="drop-icon"/>
   </div>
   <div className='favorites-card-description'>Get your favorite big burger at a discount today at GoGrub.</div>
      <hr className='favorites-horizontal-line'></hr>
   <div className='favorites-card-price'> <b>Ksh 2000 </b></div>
  <div className='favorites-icons'>
  <Heart size={16} colour="dark-gray"/>
  <div className='favorites-counter'>
      <button className='favorites-counter-button' onClick={decrease}><Minus size={16}/></button>
       <span className="favorites-quantity">{quantity}</span>
      <button className='favorites-counter-button' onClick={increase}><Plus size={16}/></button>
      </div>
  </div>
  <hr className='favorites-horizontal-line'></hr>
  <div className='favorites-order-button'>
     <button>Grub it!</button>
  </div>
</div>

<div className="favorites-card">
  
  <img className='favorites-card-image' src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Zm9vZHxlbnwwfHwwfHx8MA%3D%3D" alt="" ></img>
  <div className='favorites-card-content'>
     <div className='favorites-card-title'> <b>Large pizza</b></div>
      <MoreVertical size={24}color="black" className="drop-icon"/>
  </div>
  <div className='favorites-card-description'>Get your favorite pizza big at a discount today at GoGrub.</div>
     <hr className='favorites-horizontal-line'></hr>
  <div className='favorites-card-price'> <b>Ksh 2000 </b></div>
 <div className='favorites-icons'>
 <Heart size={16} colour="dark-gray"/>
 <div className='favorites-counter'>
     <button className='favorites-counter-button' onClick={decrease}><Minus size={16}/></button>
      <span className="favorites-quantity">{quantity}</span>
     <button className='favorites-counter-button' onClick={increase}><Plus size={16}/></button>
     </div>
 </div>
 <hr className='favorites-horizontal-line'></hr>
 <div className='favorites-order-button'>
    <button>Grub it!</button>
 </div>
</div>
   
        {/* <SplitText
    text="You don't have any favorites yet !"
    className="text-2xl font-semibold text-center"
    delay={100}
    duration={0.2}
    ease="power3.out"
    splitType="chars"
    from={{ opacity: 0, y: 40 }}    
    to={{ opacity: 1, y: 0 }}
    threshold={0.1}
    rootMargin="-100px"
    textAlign="center"
    onLetterAnimationComplete={handleAnimationComplete}
  />
        <HeartCrack size={100} color="#000000" /> */}
      </div>
    </>
  );
}

export default Favorites;