import react from 'react';
import {ClipboardList} from 'lucide-react';
import './Myorder.css';


const Myorder= () => {
  const myorderBackgroundStyle = {
    backgroundImage: "url('https://images.unsplash.com/flagged/photo-1593005510509-d05b264f1c9c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmVkfGVufDB8fDB8fHww')"
  };

  return (  
    <>
      <div className="full-page-background" style={myorderBackgroundStyle}></div>
      <div className='myorder-content'>
        <h1>You don't have any orders yet</h1>  
        <ClipboardList size={240} />
      </div>
    </>
  );
}   

export default Myorder;
