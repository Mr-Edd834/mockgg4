import react from 'react';
import MealsCard from '../Cards/Meals';
import './Fastfood.css';

function Fastfood() {
  const checkoutBackgroundStyle = {
    backgroundImage: "url('https://images.unsplash.com/flagged/photo-1593005510509-d05b264f1c9c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmVkfGVufDB8fDB8fHww')"
  };

  return (
    <>
    <div className="full-page-background" style={checkoutBackgroundStyle}></div>
    <div className="page-content">
      <div className="fastfood-cards-wrapper">
        <div className="slide-top">
          <div className='page-content-fastfood'>
            <MealsCard />
            <MealsCard />
            <MealsCard />
            <MealsCard />
            <MealsCard />
            <MealsCard />
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default Fastfood;
