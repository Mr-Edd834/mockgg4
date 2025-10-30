import React, { useEffect, useState } from 'react';
import { ClipboardList, CheckCircle, XCircle } from 'lucide-react';
import './Orderhistory.css';
import { useAuth } from '../Contexts/AuthContext';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const Orderhistory = () => {
  const { currentUser, getIdToken } = useAuth();
  const [completedOrders, setCompletedOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const orderhistoryBackgroundStyle = {
    backgroundImage: "url('https://images.unsplash.com/flagged/photo-1593005510509-d05b264f1c9c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmVkfGVufDB8fDB8fHww')"
  };

  useEffect(() => {
    fetchCompletedOrders();
  }, [currentUser]);

  const fetchCompletedOrders = async () => {
    if (!currentUser) return;
    
    try {
      setLoading(true);
      const token = await getIdToken();
      const response = await axios.get(
        `${API_URL}/api/orders/completed`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      if (response.data.success) {
        setCompletedOrders(response.data.data);
      }
    } catch (error) {
      console.error('Failed to fetch order history:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusDisplay = (status) => {
    if (status === 'completed') {
      return {
        message: 'Order Completed',
        icon: <CheckCircle className="status-icon" size={20} />,
        color: '#22c55e'
      };
    } else {
      return {
        message: 'Order Rejected',
        icon: <XCircle className="status-icon" size={20} />,
        color: '#ef4444'
      };
    }
  };

  return (
    <>
      <div className="full-page-background" style={orderhistoryBackgroundStyle}></div>
      <div className='page-content'>
        {loading ? (
          <div className='orderhistory-loading'>
            <p>Loading order history...</p>
          </div>
        ) : completedOrders.length === 0 ? (
          <div className='orderhistory-empty-content'>
            <h1>No Order History Yet</h1>
            <ClipboardList size={240} />
            <p>Your completed and past orders will appear here</p>
          </div>
        ) : (
          <div className="orderhistory-content">
            <h1 className="orderhistory-header">Order History</h1>
            <div className="orderhistory-items-container">
              {completedOrders.map((order) => {
                const statusInfo = getStatusDisplay(order.status);
                const isRejected = order.status === 'rejected';
                
                return (
                  <div
                    key={order.orderId}
                    className={`orderhistory-card ${isRejected ? 'rejected' : 'completed'}`}
                  >
                    {/* Order Header */}
                    <div className="orderhistory-card-header">
                      <div className="orderhistory-id">
                        <span className="orderhistory-label">Order ID:</span>
                        <span className="orderhistory-value">{order.orderId}</span>
                      </div>
                      <div className="orderhistory-date">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </div>
                    </div>

                    {/* Order Items */}
                    <div className="orderhistory-items-list">
                      {order.items.map((item, index) => (
                        <div key={`${item.id}-${index}`} className="orderhistory-item-row">
                          <div className="orderhistory-item-image-container">
                            <img 
                              src={item.image} 
                              alt={item.name}
                              className="orderhistory-item-image"
                            />
                          </div>
                          <div className="orderhistory-item-details">
                            <h3 className="orderhistory-item-name">{item.name}</h3>
                            <p className="orderhistory-item-category">{item.category}</p>
                          </div>
                          <div className="orderhistory-item-quantity">
                            Qty: {item.quantity}
                          </div>
                          <div className="orderhistory-item-price">
                            Ksh {(item.price * item.quantity).toLocaleString()}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Order Total */}
                    <div className="orderhistory-total">
                      <span className="orderhistory-total-label">Total:</span>
                      <span className="orderhistory-total-value">Ksh {order.total.toLocaleString()}</span>
                    </div>

                    {/* Status Badge */}
                    <div 
                      className="orderhistory-status-badge"
                      style={{ 
                        backgroundColor: statusInfo.color,
                        color: 'white'
                      }}
                    >
                      {statusInfo.icon}
                      <span>{statusInfo.message}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </>
  );
}   

export default Orderhistory;