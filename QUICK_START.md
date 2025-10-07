# 🚀 Quick Start Guide - Authentication Setup

## What You Need to Do

### 1️⃣ Backend Setup (5 minutes)

#### Copy Files to Your Backend Project

Navigate to your `ggbackend` project folder and copy these files:

```bash
# From this project's backend-auth-files/ folder, copy to your backend:

backend-auth-files/controllers/authController.js    → ggbackend/controllers/
backend-auth-files/models/User.js                   → ggbackend/models/
backend-auth-files/middleware/authMiddleware.js     → ggbackend/middleware/
backend-auth-files/routes/authRoutes.js             → ggbackend/routes/
```

#### Install Dependencies

In your `ggbackend` folder:

```bash
npm install bcryptjs jsonwebtoken mongoose
```

#### Update Your server.js

Add these two lines to your existing `server.js`:

```javascript
// At the top with other imports
const authRoutes = require('./routes/authRoutes');

// After your other app.use() statements
app.use('/auth', authRoutes);
```

#### Add Environment Variables

In your `ggbackend/.env` file, add:

```env
JWT_SECRET=paste_the_secret_generated_below
FRONTEND_URL=http://localhost:3000
```

**Generate JWT_SECRET** (run this in terminal):
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Copy the output and paste it as your `JWT_SECRET` value.

#### Restart Your Backend

```bash
npm start
```

---

### 2️⃣ Test It Out

1. **Start your frontend** (this project):
   ```bash
   npm start
   ```

2. **Try to login** - You'll need to create an account first!

3. **Create a test account** using curl or Postman:
   ```bash
   curl -X POST http://localhost:5000/auth/register \
     -H "Content-Type: application/json" \
     -d '{"email":"test@test.com","password":"test123","name":"Test User"}'
   ```

4. **Login on your app** with:
   - Email: `test@test.com`
   - Password: `test123`
   - Check "Remember me" to test the feature

5. **Close and reopen your browser** - You should stay logged in!

---

### 3️⃣ Add Logout to Your Components

Example - Add to your Sidebar or Profile:

```javascript
import authService from '../utils/auth';
import { useNavigate } from 'react-router-dom';

function YourComponent() {
  const navigate = useNavigate();

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  return (
    <button onClick={handleLogout}>
      Logout
    </button>
  );
}
```

Or use the ready-made component:

```javascript
import LogoutButton from './LogoutButton';

function YourComponent() {
  return <LogoutButton />;
}
```

---

## ✅ Verification Checklist

- [ ] Backend files copied
- [ ] Dependencies installed
- [ ] JWT_SECRET added to .env
- [ ] authRoutes added to server.js
- [ ] Backend running without errors
- [ ] Can create test account
- [ ] Can login on frontend
- [ ] "Remember me" works
- [ ] Protected routes work

---

## 🎯 What Works Now

✅ Users can register with email/password  
✅ Users can login  
✅ Passwords are securely hashed in database  
✅ "Remember me" keeps users logged in  
✅ Protected routes redirect to login if not authenticated  
✅ Tokens expire after 24 hours (or 7 days with remember me)  
✅ Auto-login if valid token exists  

---

## 📖 More Details

For detailed documentation, see:
- `AUTHENTICATION_SETUP_GUIDE.md` - Complete guide
- `backend-auth-files/INTEGRATION_INSTRUCTIONS.md` - Backend details

---

## 🆘 Quick Troubleshooting

**Problem**: Backend won't start  
**Fix**: Check that MongoDB is running and `MONGODB_URI` is set in `.env`

**Problem**: CORS errors  
**Fix**: Make sure `FRONTEND_URL=http://localhost:3000` is in backend `.env`

**Problem**: Can't login  
**Fix**: Check backend console for errors, verify user exists in database

**Problem**: "Remember me" doesn't work  
**Fix**: Check browser localStorage in DevTools → Application → Local Storage

---

**Need help?** Check the backend console logs and browser console for error messages.

