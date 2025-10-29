# 🚀 Quick Start - Order Management System

## ⚡ Get It Running in 3 Steps!

### Step 1: Start Backend (Terminal 1)
```bash
cd C:\Users\Macharia\Documents\GGbackend
npm start
```
✅ Wait for: "✅ Server running on http://localhost:5000"

---

### Step 2: Start Customer App - mockgg (Terminal 2)
```bash
cd C:\Users\Macharia\Documents\edd_y\mockgg
npm start
```
✅ Opens: http://localhost:3000

---

### Step 3: Start Admin App - ggadmin (Terminal 3)
```bash
cd C:\Users\Macharia\Documents\edd_y\ggadmin  
npm start
```
✅ Opens: http://localhost:3001 (or different port)

---

## 🧪 Quick Test (5 Minutes)

### 1. Customer Side (mockgg):
1. Navigate to any category (Delight Meals, etc.)
2. Add items to cart (click "Grub it!")
3. Go to Checkout
4. Click "Proceed to Payment"
5. Fill in:
   - Location: "123 Test Street"
   - Phone: "0712345678"
   - Select payment: M-Pesa
6. Click "Pay"
7. **CHECK:** 
   - ✅ Navigate to MyOrders
   - ✅ See order with "Your order is being processed"
   - ✅ Orange spinner animating
   - ✅ White dot on MyOrders icon in sidebar

### 2. Admin Side (GGadmin):
1. Go to "Your Orders" in sidebar
2. **CHECK:**
   - ✅ See the new order
   - ✅ See customer details
   - ✅ See all items
   - ✅ See "Accept Order" + "Reject Order" buttons
3. Click "Accept Order"
4. **CHECK:**
   - ✅ Green "Accepted" badge appears
   - ✅ Button changes to "Order is Complete"
5. Click "Order is Complete"
6. **CHECK:**
   - ✅ Order disappears from "Your Orders"

### 3. Customer Side Again (mockgg):
1. Refresh MyOrders or wait a moment
2. **CHECK:**
   - ✅ Message: "Your food is on the way"
   - ✅ Green truck icon
   - ✅ "Order has arrived" button visible
   - ✅ White dot still showing
3. Click "Order has arrived"
4. **CHECK:**
   - ✅ Message: "Your order has arrived"
   - ✅ Green checkmark
   - ✅ White dot disappears

### 4. Admin Side Again (GGadmin):
1. Go to "Completed Orders"
2. **CHECK:**
   - ✅ See completed order
   - ✅ Green "Order Completed" badge

---

## 🎯 Status Messages Quick Reference

### In mockgg MyOrders:
- 🔄 Orange: "Your order is being processed"
- 🚗 Green: "Your food is on the way"
- ✅ Green: "Your order has arrived"
- ❌ Red: "Sorry your order couldn't be processed"

### In GGadmin:
- Pending: Accept + Reject buttons
- Accepted: Green "Accepted" badge + "Order is Complete" button
- Completed: In "Completed Orders" with green badge
- Rejected: In "Completed Orders" with red badge

---

## 💡 Quick Tips

### Customer (mockgg):
- White dot = You have active orders
- No dot = All orders completed/rejected
- Click "Order has arrived" only when food actually arrives!

### Admin (GGadmin):
- "Your Orders" = Active orders to manage
- "Completed Orders" = History/Archive
- Pages auto-refresh every 30 seconds
- Accept → Process → Complete workflow

---

## 🔍 Troubleshooting

### Order not appearing in GGadmin?
- Check backend is running (port 5000)
- Check console for errors
- Refresh "Your Orders" page

### Status not updating in mockgg?
- Refresh the page
- Check backend connection
- Check browser console

### White dot not showing/hiding?
- Check order status in database
- Refresh sidebar
- Check getPendingOrdersCount() logic

---

## 📊 What Happens Behind The Scenes

```
mockgg: Click "Pay"
   ↓
Backend: Save order (status: pending)
   ↓
GGadmin: Shows in "Your Orders"
   ↓
Admin: Click "Accept"
   ↓
Backend: Update status (status: accepted)
   ↓
mockgg: Fetch orders, show "processing"
   ↓
Admin: Click "Order is Complete"
   ↓
Backend: Update status (status: on-the-way)
   ↓
mockgg: Show "food is on the way" + button
   ↓
Customer: Click "Order has arrived"
   ↓
Backend: Update status (status: completed)
   ↓
GGadmin: Moves to "Completed Orders"
mockgg: White dot disappears
```

---

## ✅ You're Ready!

**Start all 3 services and test the flow!**

Everything is connected and working. The complete order management system is LIVE! 🎉

---

## 📚 Full Documentation

See `COMPLETE_ORDER_SYSTEM.md` for detailed technical documentation.

