# Authentication Setup Guide - GoGrub App

## 🎉 What Has Been Implemented

Your GoGrub app now has a complete authentication system with:

1. ✅ **Email/Password Login** - Users can log in with email and password
2. ✅ **Remember Me Functionality** - Users stay logged in across sessions
3. ✅ **Secure Password Storage** - Passwords are hashed before saving to database
4. ✅ **JWT Token Authentication** - Secure token-based authentication
5. ✅ **Protected Routes** - Pages that require authentication
6. ✅ **Auto-Login** - Users with valid tokens are automatically logged in

---

## 📁 Files Created/Modified

### Frontend (React)

#### Created Files:
- `src/utils/auth.js` - Authentication service for API calls and token management

#### Modified Files:
- `src/Components/Login.js` - Updated to use backend API for authentication
- `src/Components/Login.css` - Added error message styling
- `src/Components/ProtectedRoute.js` - Updated to verify JWT tokens

### Backend (Node.js/Express) - Files in `backend-auth-files/`

You need to copy these to your backend project:

```
backend-auth-files/
├── controllers/
│   └── authController.js       - Login, register, verify endpoints
├── models/
│   └── User.js                 - MongoDB user schema
├── middleware/
│   └── authMiddleware.js       - JWT verification middleware
├── routes/
│   └── authRoutes.js           - Authentication routes
├── ENV_TEMPLATE.txt            - Environment variables template
├── package.json                - Required dependencies
├── server.js.example           - Example integration
└── INTEGRATION_INSTRUCTIONS.md - Detailed backend setup guide
```

---

## 🔧 Backend Setup Instructions

### Step 1: Install Dependencies

In your backend project (`ggbackend`), run:

```bash
npm install bcryptjs jsonwebtoken mongoose cors dotenv
```

### Step 2: Copy Backend Files

Copy all files from `backend-auth-files/` to your backend project:

```
controllers/authController.js    → backend/controllers/
models/User.js                   → backend/models/
middleware/authMiddleware.js     → backend/middleware/
routes/authRoutes.js             → backend/routes/
```

### Step 3: Update Your Server File

In your `server.js` or `app.js`, add:

```javascript
// Import auth routes
const authRoutes = require('./routes/authRoutes');

// Use auth routes (add this after your other middleware)
app.use('/auth', authRoutes);
```

### Step 4: Configure Environment Variables

Add to your `.env` file:

```env
# JWT Secret (generate a strong random string)
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production

# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/gogrub
# Or use MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/gogrub

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:3000
```

**Generate a secure JWT_SECRET:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Step 5: Update CORS Configuration

Make sure your backend allows requests from frontend:

```javascript
const cors = require('cors');

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
```

For production (Render):
```javascript
app.use(cors({
  origin: ['http://localhost:3000', 'https://your-frontend-domain.com'],
  credentials: true
}));
```

### Step 6: Restart Your Backend

```bash
# Development
npm start

# Or with nodemon
npm run dev
```

---

## 🚀 How It Works

### 1. User Registration Flow

```
User fills registration form
    ↓
Frontend sends { email, password, name } to POST /auth/register
    ↓
Backend validates input and checks if user exists
    ↓
Backend hashes password with bcrypt
    ↓
Backend saves user to MongoDB
    ↓
Backend generates JWT token (24h expiration)
    ↓
Frontend stores token and user data
    ↓
User is logged in and redirected
```

### 2. User Login Flow

```
User enters email + password + checks "remember me"
    ↓
Frontend sends { email, password, rememberMe } to POST /auth/login
    ↓
Backend finds user and verifies password
    ↓
Backend generates JWT token (7 days if rememberMe, 24h otherwise)
    ↓
Frontend stores token in localStorage (rememberMe) or sessionStorage
    ↓
User is redirected to home page
```

### 3. Remember Me Functionality

- **Checked**: Token stored in `localStorage` (persists after browser close) for 7 days
- **Unchecked**: Token stored in `sessionStorage` (cleared when browser closes) for 24 hours
- Email is saved in `localStorage` for convenience (even if remember me is off)

### 4. Auto-Login on Page Load

```
User visits app
    ↓
Login component checks for existing token
    ↓
If token exists, verifies with GET /auth/verify
    ↓
If valid, redirects to home (user already logged in)
    ↓
If invalid, clears token and shows login form
```

### 5. Protected Routes

```
User navigates to protected page
    ↓
ProtectedRoute component checks for token
    ↓
If no token, redirects to /login
    ↓
If token exists, verifies with backend
    ↓
If valid, shows protected page
    ↓
If invalid, redirects to /login
```

---

## 🔒 Security Features

1. **Password Hashing**: Passwords are hashed with bcrypt (10 salt rounds) before storage
2. **No Plain Text Passwords**: Passwords are NEVER stored in plain text
3. **JWT Tokens**: Stateless authentication tokens
4. **Token Expiration**: Tokens expire after 24h or 7 days
5. **Secure Transport**: Use HTTPS in production
6. **CORS Protection**: Only specified origins can access API
7. **Token Verification**: Every protected route verifies token validity

---

## 🧪 Testing the API

### Register a New User

```bash
curl -X POST https://ggbackend-1.onrender.com/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "name": "Test User"
  }'
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "email": "test@example.com",
    "name": "Test User"
  }
}
```

### Login

```bash
curl -X POST https://ggbackend-1.onrender.com/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "rememberMe": true
  }'
```

### Verify Token

```bash
curl -X GET https://ggbackend-1.onrender.com/auth/verify \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## 📋 API Endpoints Summary

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/auth/register` | Create new user account | No |
| POST | `/auth/login` | Login user | No |
| GET | `/auth/verify` | Verify JWT token | Yes |
| POST | `/auth/logout` | Logout user | Yes |

---

## 🎨 Using Authentication in Your Components

### Check if User is Logged In

```javascript
import authService from '../utils/auth';

// Check authentication
if (authService.isAuthenticated()) {
  console.log('User is logged in!');
}

// Get current user
const user = authService.getUser();
console.log(user.email, user.name);
```

### Logout User

```javascript
import authService from '../utils/auth';
import { useNavigate } from 'react-router-dom';

function MyComponent() {
  const navigate = useNavigate();

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  return <button onClick={handleLogout}>Logout</button>;
}
```

### Make Authenticated API Calls

```javascript
import axios from 'axios';
import authService from '../utils/auth';

// Get protected data
const response = await axios.get('https://ggbackend-1.onrender.com/api/myorders', {
  headers: authService.getAuthHeader()
});
```

---

## 🛠️ Next Steps (Optional Enhancements)

1. **Add Registration Page**: Create a signup form using the same auth service
2. **Password Reset**: Implement forgot password functionality
3. **Profile Management**: Allow users to update their profile
4. **Social Login**: Keep Google OAuth alongside email/password
5. **Session Timeout**: Add automatic logout after inactivity
6. **Toast Notifications**: Show success/error messages
7. **Loading States**: Add better loading indicators

---

## 🐛 Troubleshooting

### Issue: "Cannot find module '../utils/auth'"
**Solution**: Make sure `src/utils/auth.js` exists

### Issue: CORS errors
**Solution**: Update backend CORS to include your frontend URL

### Issue: "JWT_SECRET is not defined"
**Solution**: Add `JWT_SECRET` to your backend `.env` file

### Issue: "Invalid token"
**Solution**: Token might be expired or invalid. Clear localStorage and login again

### Issue: MongoDB connection failed
**Solution**: Check `MONGODB_URI` in `.env` file

---

## 📞 Support

For detailed backend integration, see:
- `backend-auth-files/INTEGRATION_INSTRUCTIONS.md`

For questions, check:
- Backend server logs for errors
- Browser console for frontend errors
- Network tab in DevTools for API call status

---

## ✅ Checklist

- [ ] Backend files copied to correct directories
- [ ] Dependencies installed (`npm install`)
- [ ] JWT_SECRET added to .env
- [ ] MongoDB connection configured
- [ ] authRoutes imported and used in server.js
- [ ] CORS configured for frontend URL
- [ ] Backend server restarted
- [ ] Test registration endpoint
- [ ] Test login endpoint
- [ ] Test remember me functionality
- [ ] Test protected routes

---

**🎉 Congratulations! Your authentication system is ready!**

