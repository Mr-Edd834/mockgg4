import react from "react";
import './OrderhistoryCard.css';

function OrderhistoryCard(){
    return(
          <div className="orderhistory-card">
            <div className="orderhistory-card-date">
                <p>Mon</p>
                <h3>27/</h3>
                <h3>09/</h3>
                <h3>2025</h3>
            </div>
            <hr className="orderhistory-line"></hr>
            <div className="orderhistory-card-details">
                <h3>Large Pizza</h3>
                <p>Ksh 2000</p>
                <h3>Large Soda</h3>
                <p>Ksh 250</p>
                <h3>Ice Cream</h3>
                <p>Ksh 300</p>
            </div>
            <hr className="orderhistory-line-details"></hr>
            <div className="orderhistory-card-time">
                <h3>Delivered at: 12:23 pm.</h3>
                </div>
                  <hr className="orderhistory-line-details-time"></hr>
            <div className="orderhistory-card-total">
                <h3>Total paid:</h3>
                <p>Ksh 2550</p>
                </div>
                 <hr className="orderhistory-line-details-time"></hr>
                <div className="orderhistory-card-payment">
                <h3>Payment by:</h3>
                <p>Mpesa</p>
                </div>
                 <hr className="orderhistory-line-details-time"></hr>
                <div className="orderhistory-card-id">
                <h3>Order ID:</h3>
                <p>#1234567890</p>
                </div>
                 <hr className="orderhistory-line-details-time"></hr>
                 <div className="orderhistory-card-paid-time">
                <h3>Paid at: 12:00 pm.</h3>
                </div>
                





          </div>

     )
}
export default OrderhistoryCard;