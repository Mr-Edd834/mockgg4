import react from 'react';
import './Shopping.css';

const Shopping= () => {
  const shoppingBackgroundStyle = {
    backgroundImage: "url('https://images.unsplash.com/flagged/photo-1593005510509-d05b264f1c9c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmVkfGVufDB8fDB8fHww')"
  };

  return (
    <>
      <div className="full-page-background" style={shoppingBackgroundStyle}></div>
      <div className='shopping-page-content'>   
        <h1>Shopping Page</h1>  
        <p>This is the Shopping component.</p>
      </div>
    </>
  );
}   

export default Shopping;    