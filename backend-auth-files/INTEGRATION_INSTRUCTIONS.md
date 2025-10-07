# Backend Authentication Integration Instructions

## 📋 Prerequisites
Make sure your backend has these npm packages installed:
```bash
npm install bcryptjs jsonwebtoken mongoose cors dotenv
```

## 🔧 Step-by-Step Integration

### 1. **Copy Files to Your Backend Project**

Copy these files to your backend project (`ggbackend`):

```
backend-auth-files/
├── controllers/
│   └── authController.js       → Copy to: backend/controllers/
├── models/
│   └── User.js                 → Copy to: backend/models/
├── middleware/
│   └── authMiddleware.js       → Copy to: backend/middleware/
└── routes/
    └── authRoutes.js           → Copy to: backend/routes/
```

### 2. **Update Your Main Server File (server.js or app.js)**

Add these lines to your existing server file:

```javascript
// At the top with other imports
const authRoutes = require('./routes/authRoutes');

// After your other middleware (cors, express.json, etc.)
app.use('/auth', authRoutes);
```

**Important:** Keep your existing Google OAuth routes! The new email/password auth will work alongside it.

### 3. **Configure Environment Variables**

Add to your `.env` file:

```env
# Add this new variable
JWT_SECRET=generate_a_random_secret_key_here_at_least_32_characters_long

# Update FRONTEND_URL if not already set
FRONTEND_URL=http://localhost:3000
```

**Generate a secure JWT_SECRET:**
```bash
# Option 1: Using Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Option 2: Use an online generator or just create a long random string
```

### 4. **Update MongoDB Connection (if not already done)**

Make sure your `server.js` has MongoDB connection:

```javascript
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB error:', err));
```

### 5. **Update CORS Configuration**

Make sure your backend allows requests from your frontend:

```javascript
const cors = require('cors');

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
```

For production on Render, update to:
```javascript
app.use(cors({
  origin: ['http://localhost:3000', 'https://your-frontend-domain.com'],
  credentials: true
}));
```

## 🚀 Testing the Endpoints

### Test Registration:
```bash
curl -X POST https://ggbackend-1.onrender.com/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123","name":"Test User"}'
```

### Test Login:
```bash
curl -X POST https://ggbackend-1.onrender.com/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123","rememberMe":true}'
```

### Test Verify (replace YOUR_TOKEN):
```bash
curl -X GET https://ggbackend-1.onrender.com/auth/verify \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## 📊 API Endpoints Summary

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/auth/register` | Create new user | No |
| POST | `/auth/login` | Login user | No |
| GET | `/auth/verify` | Verify token | Yes |
| POST | `/auth/logout` | Logout user | Yes |

## ✅ Verification Checklist

- [ ] All files copied to correct directories
- [ ] Dependencies installed (`npm install`)
- [ ] JWT_SECRET added to .env
- [ ] authRoutes imported in server.js
- [ ] app.use('/auth', authRoutes) added
- [ ] MongoDB connection working
- [ ] CORS configured for frontend URL
- [ ] Server restarted
- [ ] Test registration endpoint
- [ ] Test login endpoint
- [ ] Test verify endpoint

## 🐛 Common Issues

**Issue:** "JWT_SECRET is not defined"
- **Solution:** Make sure you have `JWT_SECRET` in your `.env` file and you're using `require('dotenv').config()` at the top of your server file

**Issue:** "User is not defined"
- **Solution:** Make sure the User model path in `authController.js` matches your folder structure

**Issue:** CORS errors
- **Solution:** Update CORS configuration to include your frontend URL

**Issue:** MongoDB connection failed
- **Solution:** Check your `MONGODB_URI` in `.env` file

## 📝 Notes

- Passwords are automatically hashed before storing in database
- JWT tokens expire after 24 hours (or 7 days with "remember me")
- The User model includes support for Google OAuth (googleId field) so both authentication methods work together
- Tokens are stateless - no database lookup required for verification

