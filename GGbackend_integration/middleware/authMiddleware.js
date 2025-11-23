const admin = require('../config/firebase-admin');

/**
 * Middleware to verify Firebase ID token
 */
const verifyFirebaseToken = async (req, res, next) => {
  try {
    // Get token from Authorization header
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'No token provided'
      });
    }

    const idToken = authHeader.split('Bearer ')[1];

    // Verify the token with Firebase Admin
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    
    // Attach user info to request
    req.user = {
      uid: decodedToken.uid,
      email: decodedToken.email,
      emailVerified: decodedToken.email_verified
    };

    next();
  } catch (error) {
    console.error('Token verification error:', error);
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired token'
    });
  }
};

module.exports = { verifyFirebaseToken };


