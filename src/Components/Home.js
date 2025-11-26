import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Instagram } from 'lucide-react';
import "./Home.css";
import {MapPin} from 'lucide-react';
import {LogIn} from 'lucide-react';
import SplitText from "../Animations/SplitText";
import ScrollFloat from '../Animations/ScrollFloat';
import { useAuth } from '../Contexts/AuthContext';

const Home = () => {
  const navigate = useNavigate();
  const whiteSectionRef = useRef(null);
  const auth = useAuth();
  const currentUser = auth?.currentUser;
  const userProfile = auth?.userProfile;

  const homeBackgroundStyle = {
    backgroundImage: "url('https://i.pinimg.com/736x/ab/86/9b/ab869b111b99108f2615613537113ae9.jpg')"
  };

  // Scroll-triggered animation for blurred section cards
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Reset and replay animations when the white section comes into view
            const leftCard = document.getElementById('left-card');
            const middleCard = document.getElementById('middle-card');
            const rightCard = document.getElementById('right-card');
            
            // Reset and replay animations using class toggle
            if (leftCard) {
              leftCard.classList.remove('animate-left');
              setTimeout(() => {
                leftCard.classList.add('animate-left');
              }, 10);
            }
            if (middleCard) {
              middleCard.classList.remove('animate-middle');
              setTimeout(() => {
                middleCard.classList.add('animate-middle');
              }, 10);
            }
            if (rightCard) {
              rightCard.classList.remove('animate-right');
              setTimeout(() => {
                rightCard.classList.add('animate-right');
              }, 10);
            }
          }
        });
      },
      {
        threshold: 0.3, // Trigger when 30% of the element is visible
        rootMargin: '0px 0px -50px 0px' // Start animation slightly before fully in view
      }
    );

    if (whiteSectionRef.current) {
      observer.observe(whiteSectionRef.current);
    }

    return () => {
      const currentRef = whiteSectionRef.current;
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);
  const handleAnimationComplete = () => {
    console.log('All letters have animated!');
  };

  return (
    <>
      <div className="full-page-background" style={homeBackgroundStyle}></div>
      
      {/* Header Section - Welcome & Login in one row, Search below */}
      <div className="home-header-section">
        <div className="home-header-content">
          <SplitText
            text={currentUser && userProfile ? `Welcome ${userProfile.username}!` : "Welcome to GoGrub!"}
            className="welcome-text"
            delay={100}
            duration={0.6}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 40 }}    
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin="-100px"
            textAlign="left"
            onLetterAnimationComplete={handleAnimationComplete}
          />
          
          <div className="login-icon-container" onClick={() => navigate('/login')}>
            <LogIn 
              className="login-icon" 
              size={24} 
            />
            <span className="login-text">{currentUser ? 'Account' : 'Login'}</span>
          </div>
        </div> 
        
        <div className="input-wrapper">
          <MapPin className="input-icon" size={20} />  
          <input type="text" placeholder="Enter your location" />
        </div>
      </div>
  
      <div className="page-content">
      <div className="cards-wrapper">
        <div className="slide-top">
        {/* Container 1: Food Services */}
        <div className="cards-container">
          <div className="cards-grid-three">
            <div className="card">
              <img className="card-image" alt="Delight meals" src="https://images.unsplash.com/photo-1598515211932-b130a728a769?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8YmFsYW5jZWQlMjBtZWFsfGVufDB8fDB8fHww" />
              <div className="card-content">
                <div className="card-title"><b>Delight meals.</b></div>
                <div className="card-text">Get your warm balanced meals here.</div>
              </div>
              <div className="card-actions">
                <button className="card-button" onClick={() => navigate('/delightmeals')}>GO</button>
              </div>
            </div>

            <div className="card">
              <img className="card-image" alt="Fastfood" src="https://media.istockphoto.com/id/692557700/photo/burger.webp?a=1&b=1&s=612x612&w=0&k=20&c=F8z8w8zz6J4j1_rdIrwubc6wd_7GYpsU60-A7qj-vxE=" />
              <div className="card-content">
                <div className="card-title"><b>Fast Feast.</b></div>
                <div className="card-text">Enjoy food faster than your hunger.</div>
              </div>
              <div className="card-actions">
                <button className="card-button" onClick={() => navigate('/fastfood')}>GO</button>
              </div>
            </div>
            <div className="card">
              <img className="card-image" alt="Snacks" src="https://images.unsplash.com/photo-1621447504864-d8686e12698c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y3Jpc3BzfGVufDB8fDB8fHww" />
              <div className="card-content">
                <div className="card-title"><b>Snack Hub.</b></div>
                <div className="card-text">All your cravings in one place.</div>
              </div>
              <div className="card-actions">
                <button className="card-button" onClick={() => navigate('/snacks')}>GO</button>
              </div>
            </div>
          </div>
        </div>

        {/* Container 2: Premium Services */}
        <div className="cards-container">
          <div className="cards-grid-three">
            <div className="card">
              <img className="card-image" alt="Bespoke Bites" src="https://plus.unsplash.com/premium_photo-1722600019555-a9d9cd5ced3c?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"/>
              <div className="card-content">
                <div className="card-title"><b>Bespoke Bites.</b></div>
                <div className="card-text">Prepare your weekly meal plan with your very own private chef.</div>
              </div>
              <div className="card-actions">
                <button className="card-button" onClick={() => navigate('/privatechef')}>GO</button>
              </div>
            </div>

            <div className="card">
              <img className="card-image" alt="GrubMart" src="https://images.unsplash.com/photo-1601600576337-c1d8a0d1373c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c3VwZXJtYXJrZXR8ZW58MHx8MHx8fDA%3D"/>
              <div className="card-content">
                <div className="card-title"><b>GrubMart.</b></div>
                <div className="card-text">Low on supplies? We got you covered.Stock up made simple.</div>
              </div>
              <div className="card-actions">
                <button className="card-button" onClick={() => navigate('/shopping')}>GO</button>
              </div>
            </div>
            <div className="card">
              <img className="card-image" alt="GrubFlame" src="https://media.istockphoto.com/id/938158956/photo/burning-gas-burner.webp?a=1&b=1&s=612x612&w=0&k=20&c=wQRSX13GD8WILepxvnj-EHQwhHTTlqP-1Xlc8726nko="/>
              <div className="card-content">
                <div className="card-title"><b>GrubFlame.</b></div>
                <div className="card-text">Out of gas? We've got your flame.</div>
              </div>
              <div className="card-actions">
                <button className="card-button" onClick={() => navigate('/gas')}>GO</button>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
      
      {/* Wavy line separator
      <div className="wavy-separator"></div> */}
      
      {/* White section with additional cards */}
      <div className="white-section" ref={whiteSectionRef}>
      <ScrollFloat
  animationDuration={1}
  ease='back.inOut(2)'
  scrollStart='center bottom+=50%'
  scrollEnd='bottom bottom-=40%'
  stagger={0.03}
  id="work-with-us"
>
  JOIN US !
</ScrollFloat>
        {/* <h1>WORK WITH US</h1> */}
        {/* Container 3: Work with Us */}
        <div className="cards-container">
          <div className="cards-grid-three">
            <div className="card" id="left-card">
              <img className="card-image" alt="Additional service 1" src="https://images.unsplash.com/photo-1521790797524-b2497295b8a0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGhhbmQlMjBzaGFrZXxlbnwwfHwwfHx8MA%3D%3D" />
              <div className="card-content">
                <div className="card-title"><b>GrubLink.</b></div>
                <div className="card-text">Because partnerships taste better.</div>
              </div>
              <div className="card-actions">
                <button className="card-button" onClick={() => navigate('/Partner')}>GO</button>
              </div>
            </div>

            <div className="card" id="middle-card">  
              <img className="card-image" alt="Additional service 2" src="https://images.unsplash.com/photo-1588416820614-f8d6ac6cea56?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y29tbWVyY2lhbCUyMGtpdGNoZW58ZW58MHx8MHx8fDA%3D"/>
              <div className="card-content">
                <div className="card-title"><b>Kitchen Connect.</b></div>
                <div className="card-text">Grow with us.</div>
              </div>
              <div className="card-actions">
                <button className="card-button" onClick={() => navigate('/Hotel')}>GO</button>
              </div>
            </div>
            <div className="card" id="right-card">
              <img className="card-image" alt="Additional service 3" src="https://media.istockphoto.com/id/2213567565/photo/smiling-courier-delivering-package-to-customer.webp?a=1&b=1&s=612x612&w=0&k=20&c=Ge9MHv6yLSbuoFc0CARVDx0x-wv2ZfuodUH2QEJwyRI=" />
              <div className="card-content">
                <div className="card-title"><b>GrubRider Hub.</b></div>
                <div className="card-text">Ride.Deliver.Earn</div>
              </div>
              <div className="card-actions">
                <button className="card-button" onClick={() => navigate('/Rider')}>GO</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
      <div className="footer">
        <div className="footer-content">
          <div className="footer-content-left">
          <h1>FOLLOW US:</h1>
          <Instagram size={24} color="white" />
<a href="https://www.instagram.com/gogrub_ke/">@gogrub_ke</a>
       
        </div>
        <p>© 2025 GoGrub. All rights reserved.</p>
        </div>
        <div className="footer-content-right">
          <h1>CONTACT US:</h1>
          <p>Email: info@gogrub.com</p>
          <p>Phone: +254 716 208 682</p>
        </div>
      </div>
    </>
  );
}

export default Home;