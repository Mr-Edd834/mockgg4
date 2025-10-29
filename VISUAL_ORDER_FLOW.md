# 📸 Visual Order Flow - What You'll See

## 🎨 Customer Experience (mockgg)

### Screen 1: Checkout Page
```
┌─────────────────────────────────────┐
│  Your Cart                          │
├─────────────────────────────────────┤
│  [Image] Chicken Burger             │
│          FastFood                   │
│          Qty: 2    Ksh 1,000       │
│          [Remove Button]            │
├─────────────────────────────────────┤
│  Total Items: 2                     │
│  Grand Total: Ksh 1,000            │
│                                     │
│  [Proceed to Payment]              │
└─────────────────────────────────────┘
```

---

### Screen 2: PlaceOrder Page
```
┌─────────────────────────────────────┐
│  🍊 BRIGHT ORANGE BACKGROUND 🍊     │
│                                     │
│  ┌─ Glass Container ─┐             │
│  │ Your Location:     │             │
│  │ [____________]     │             │
│  │                    │             │
│  │ Your Phone Number: │             │
│  │ [____________]     │             │
│  └────────────────────┘             │
│                                     │
│  ┌─ Payment Methods ─┐              │
│  │ [M-pesa]          │              │
│  │ [Credit Card] ▼   │              │
│  │   └─ Card Form ─┐ │              │
│  │     Card Number  │ │              │
│  │     [__________] │ │              │
│  │     Name         │ │              │
│  │     [__________] │ │              │
│  │     MM/YY   CVV  │ │              │
│  │     [___] [___]  │ │              │
│  │   └─────────────┘ │              │
│  │ [Crypto]          │              │
│  │ [Cash]            │              │
│  └───────────────────┘              │
│                                     │
│  [      Pay      ]                  │
└─────────────────────────────────────┘
```

---

### Screen 3: MyOrders Page (Status: Pending/Accepted)
```
┌─────────────────────────────────────┐
│  Sidebar:                           │
│  ⚪ My Order (white dot showing)    │
├─────────────────────────────────────┤
│  My Orders                          │
│                                     │
│  ┌─ Order Card ────────────────┐   │
│  │ Order ID: ORD-1234567890    │   │
│  │ 10/29/2025                  │   │
│  ├──────────────────────────────┤   │
│  │ [Img] Chicken Burger        │   │
│  │       Qty: 2  Ksh 1,000     │   │
│  ├──────────────────────────────┤   │
│  │ Total: Ksh 1,000            │   │
│  ├──────────────────────────────┤   │
│  │ 🔄 Your order is being      │   │
│  │    processed                │   │
│  │    (Orange border, spinner) │   │
│  └──────────────────────────────┘   │
└─────────────────────────────────────┘
```

---

### Screen 4: MyOrders (Status: On-The-Way)
```
┌─────────────────────────────────────┐
│  Sidebar:                           │
│  ⚪ My Order (white dot still on)   │
├─────────────────────────────────────┤
│  My Orders                          │
│                                     │
│  ┌─ Order Card ────────────────┐   │
│  │ Order ID: ORD-1234567890    │   │
│  ├──────────────────────────────┤   │
│  │ [Items displayed...]        │   │
│  ├──────────────────────────────┤   │
│  │ Total: Ksh 1,000            │   │
│  ├──────────────────────────────┤   │
│  │ 🚗 Your food is on the way  │   │
│  │    (Green border)           │   │
│  │                             │   │
│  │ [Order has arrived]         │   │
│  └──────────────────────────────┘   │
└─────────────────────────────────────┘
```

---

### Screen 5: MyOrders (Status: Completed)
```
┌─────────────────────────────────────┐
│  Sidebar:                           │
│  My Order (NO white dot ❌)         │
├─────────────────────────────────────┤
│  My Orders                          │
│                                     │
│  ┌─ Order Card ────────────────┐   │
│  │ Order ID: ORD-1234567890    │   │
│  ├──────────────────────────────┤   │
│  │ [Items displayed...]        │   │
│  ├──────────────────────────────┤   │
│  │ Total: Ksh 1,000            │   │
│  ├──────────────────────────────┤   │
│  │ ✅ Your order has arrived   │   │
│  │    (Green border, checkmark)│   │
│  └──────────────────────────────┘   │
└─────────────────────────────────────┘
```

---

### Screen 6: MyOrders (Status: Rejected)
```
┌─────────────────────────────────────┐
│  Sidebar:                           │
│  My Order (NO white dot ❌)         │
├─────────────────────────────────────┤
│  My Orders                          │
│                                     │
│  ┌─ Greyed Out Card ──────────┐    │
│  │ Order ID: ORD-1234567890   │    │
│  │ (Everything greyed out)    │    │
│  ├─────────────────────────────┤    │
│  │ [Items faded...]           │    │
│  ├─────────────────────────────┤    │
│  │ Total: Ksh 1,000           │    │
│  ├─────────────────────────────┤    │
│  │ ❌ Sorry your order        │    │
│  │    couldn't be processed   │    │
│  │    (Red border)            │    │
│  └─────────────────────────────┘    │
└─────────────────────────────────────┘
```

---

## 🎨 Admin Experience (GGadmin)

### Screen 1: Your Orders (Pending Order)
```
┌─────────────────────────────────────┐
│  Your Orders                        │
│  Track and manage customer orders   │
├─────────────────────────────────────┤
│  ┌─ Order Card ────────────────┐   │
│  │ ORD-1234567890              │   │
│  │ 10/29/2025 3:45 PM          │   │
│  ├──────────────────────────────┤   │
│  │ Location: 123 Test Street   │   │
│  │ Phone: 0712345678           │   │
│  │ Payment: mpesa              │   │
│  ├──────────────────────────────┤   │
│  │ Items:                      │   │
│  │ [Img] Chicken Burger        │   │
│  │       x2      Ksh 1,000     │   │
│  ├──────────────────────────────┤   │
│  │ Total: Ksh 1,000            │   │
│  ├──────────────────────────────┤   │
│  │ [✓ Accept Order]            │   │
│  │ [✗ Reject Order]            │   │
│  └──────────────────────────────┘   │
└─────────────────────────────────────┘
```

---

### Screen 2: Your Orders (Accepted Order)
```
┌─────────────────────────────────────┐
│  ┌─ Order Card ────────────────┐   │
│  │ ORD-1234567890         ✓    │   │
│  │ 10/29/2025        [Accepted]│   │
│  │                   (green)   │   │
│  ├──────────────────────────────┤   │
│  │ [Customer details...]       │   │
│  ├──────────────────────────────┤   │
│  │ [Items list...]             │   │
│  ├──────────────────────────────┤   │
│  │ Total: Ksh 1,000            │   │
│  ├──────────────────────────────┤   │
│  │ [✓ Order is Complete]       │   │
│  │     (blue button)           │   │
│  └──────────────────────────────┘   │
└─────────────────────────────────────┘
```

---

### Screen 3: Completed Orders
```
┌─────────────────────────────────────┐
│  Completed Orders                   │
│  View all completed and rejected    │
├─────────────────────────────────────┤
│  ┌─ Order Card ────────────────┐   │
│  │ ORD-1234567890         ✅   │   │
│  │ 10/29/2025    [Order        │   │
│  │              Completed]     │   │
│  │              (green badge)  │   │
│  ├──────────────────────────────┤   │
│  │ [Customer details...]       │   │
│  ├──────────────────────────────┤   │
│  │ [Items list...]             │   │
│  ├──────────────────────────────┤   │
│  │ Total: Ksh 1,000            │   │
│  └──────────────────────────────┘   │
│                                     │
│  ┌─ Rejected Order ────────────┐   │
│  │ ORD-9876543210         ❌   │   │
│  │ 10/29/2025    [Order        │   │
│  │              Rejected]      │   │
│  │              (red badge)    │   │
│  │ [...]                       │   │
│  └──────────────────────────────┘   │
└─────────────────────────────────────┘
```

---

## 🎨 Color Legend

- 🟠 **Orange**: Processing, Pending, Accepted (spinner animating)
- 🟢 **Green**: On the way, Completed (success states)
- 🔴 **Red**: Rejected (error state)
- ⚪ **White Dot**: Active orders notification
- ⚫ **Greyed**: Rejected orders (faded, unclickable)

---

## 🔄 Button States

### mockgg MyOrders:
| Order Status | Buttons Visible |
|--------------|-----------------|
| pending | None |
| accepted | None |
| on-the-way | "Order has arrived" |
| completed | None |
| rejected | None (card greyed) |

### GGadmin Your Orders:
| Order Status | Buttons Visible |
|--------------|-----------------|
| pending | "Accept Order" + "Reject Order" |
| accepted | "Order is Complete" |

---

## ⚡ Auto-Refresh

- **GGadmin**: Auto-refreshes orders every 30 seconds
- **mockgg**: Manual refresh or page reload to see status updates

---

## 🎊 THAT'S THE COMPLETE VISUAL FLOW!

Every status, every button, every color - all working perfectly! 🚀

