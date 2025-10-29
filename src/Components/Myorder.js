import React, { useContext, useEffect } from 'react';
import { ClipboardList, Loader2, CheckCircle, XCircle, Truck } from 'lucide-react';
import './Myorder.css';
import { storeContext } from "../Contexts/storeContext";

const Myorder = () => {
  const myorderBackgroundStyle = {
    backgroundImage: "url('https://images.unsplash.com/flagged/photo-1593005510509-d05b264f1c9c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmVkfGVufDB8fDB8fHww')"
  };

  const { myOrders, updateOrderStatus, fetchOrders } = useContext(storeContext);

  // Fetch orders on component mount
  useEffect(() => {
    fetchOrders();
  }, []);

  const getStatusDisplay = (status) => {
    switch (status) {
      case 'pending':
      case 'accepted':
        return {
          message: 'Your order is being processed',
          icon: <Loader2 className="status-icon spinning" size={20} />,
          color: '#f97316', // Orange
          showButton: false
        };
      case 'on-the-way':
        return {
          message: 'Your food is on the way',
          icon: <Truck className="status-icon" size={20} />,
          color: '#22c55e', // Green
          showButton: true
        };
      case 'completed':
        return {
          message: 'Your order has arrived',
          icon: <CheckCircle className="status-icon" size={20} />,
          color: '#22c55e', // Green
          showButton: false
        };
      case 'rejected':
        return {
          message: "Sorry your order couldn't be processed",
          icon: <XCircle className="status-icon" size={20} />,
          color: '#ef4444', // Red
          showButton: false
        };
      default:
        return {
          message: 'Processing',
          icon: <Loader2 className="status-icon spinning" size={20} />,
          color: '#f97316',
          showButton: false
        };
    }
  };

  const handleOrderArrived = async (orderId) => {
    try {
      await updateOrderStatus(orderId, 'completed');
    } catch (error) {
      alert('Failed to update order status');
    }
  };

  return (
    <>
      <div className="full-page-background" style={myorderBackgroundStyle}></div>
      <div className='page-content'>
        {myOrders.length === 0 ? (
          <div className='myorder-empty-content'>
            <h1>You don't have any orders yet</h1>
            <ClipboardList size={240} />
          </div>
        ) : (
          <div className="myorder-content">
            <h1 className="myorder-header">My Orders</h1>
            <div className="myorder-items-container">
              {myOrders.map((order) => {
                const statusInfo = getStatusDisplay(order.status);
                const isGreyedOut = order.status === 'rejected';
                
                return (
                  <div
                    key={order.orderId}
                    className={`myorder-card ${isGreyedOut ? 'greyed-out' : ''}`}
                  >
                    {/* Order Header */}
                    <div className="myorder-card-header">
                      <div className="myorder-id">
                        <span className="myorder-label">Order ID:</span>
                        <span className="myorder-value">{order.orderId}</span>
                      </div>
                      <div className="myorder-date">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </div>
                    </div>

                    {/* Order Items */}
                    <div className="myorder-items-list">
                      {order.items.map((item, index) => (
                        <div key={`${item.id}-${index}`} className="myorder-item-row">
                          <div className="myorder-item-image-container">
                            <img 
                              src={item.image} 
                              alt={item.name}
                              className="myorder-item-image"
                            />
                          </div>
                          <div className="myorder-item-details">
                            <h3 className="myorder-item-name">{item.name}</h3>
                            <p className="myorder-item-category">{item.category}</p>
                          </div>
                          <div className="myorder-item-quantity">
                            Qty: {item.quantity}
                          </div>
                          <div className="myorder-item-price">
                            Ksh {(item.price * item.quantity).toLocaleString()}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Order Total */}
                    <div className="myorder-total">
                      <span className="myorder-total-label">Total:</span>
                      <span className="myorder-total-value">Ksh {order.total.toLocaleString()}</span>
                    </div>

                    {/* Status Section */}
                    <div 
                      className="myorder-status-section"
                      style={{ borderColor: statusInfo.color }}
                    >
                      <div 
                        className="myorder-status-content"
                        style={{ color: statusInfo.color }}
                      >
                        {statusInfo.icon}
                        <span className="myorder-status-message">{statusInfo.message}</span>
                      </div>

                      {statusInfo.showButton && (
                        <button
                          className="myorder-arrived-btn"
                          onClick={() => handleOrderArrived(order.orderId)}
                        >
                          Order has arrived
                        </button>
                      )}
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
};

export default Myorder;
