import React, {useContext, useEffect, useState} from 'react';
import {auth, googleProvider} from '../Firebase';
import axios from 'axios';

const AuthContext = React.createContext();

// API URL from environment variable
const API_URL = process.env.REACT_APP_API_URL;

export function useAuth() {
  return useContext(AuthContext);
}

function AuthProvider({children}) {
    const [currentUser, setcurrentUser] = useState();
    const [userProfile, setUserProfile] = useState(null);
    const [loading, setLoading] = useState(true);

// Helper function to get Firebase ID token
const getIdToken = async (user) => {
  if (user) {
    return await user.getIdToken();
  }
  return null;
};

// Sign up with email and password
async function signUp(email, password, username, phoneNumber) {
    try {
        const result = await auth.createUserWithEmailAndPassword(email, password);
        
        // Register user in MongoDB
        const token = await result.user.getIdToken();
        const response = await axios.post(
            `${API_URL}/api/auth/register`,
            { 
                uid: result.user.uid,
                email: result.user.email,
                username, 
                phoneNumber, 
                provider: 'email' 
            },
            { headers: { Authorization: `Bearer ${token}` } }
        );
        
        setUserProfile(response.data.user);
        return result;
    } catch (error) {
        console.error('Signup error:', error);
        throw { success: false, message: "Signup failed" };
    }
}

// Login with email and password
async function login(email, password) {
    try {
        const result = await auth.signInWithEmailAndPassword(email, password);
        
        // Fetch user profile from MongoDB
        const token = await result.user.getIdToken();
        const response = await axios.get(
            `${API_URL}/api/users/profile?uid=${result.user.uid}`,
            { headers: { Authorization: `Bearer ${token}` } }
        );
        
        setUserProfile(response.data.user);
        return result;
    } catch (error) {
        console.error('Login error:', error.message);
        throw { success: false, message: "Login failed" };
    }
}

// Sign in with Google
async function signInWithGoogle() {
    try {
        const result = await auth.signInWithPopup(googleProvider);
        const user = result.user;
        
        // Check if user needs to complete profile
        const token = await user.getIdToken();
        const response = await axios.post(
            `${API_URL}/api/auth/google`,
            {
                uid: user.uid,
                email: user.email,
                displayName: user.displayName,
                photoURL: user.photoURL
            },
            { headers: { Authorization: `Bearer ${token}` } }
        );
        
        if (response.data.requiresProfile) {
            // User needs to complete profile
            return {
                requiresProfile: true,
                tempUser: response.data.tempUser
            };
        } else {
            // User already exists
            setUserProfile(response.data.user);
            return {
                requiresProfile: false,
                user: response.data.user
            };
        }
    } catch (error) {
        console.error('Google sign-in error:', error);
        throw error;
    }
}

// Complete profile after Google sign-in
async function completeProfile(username, phoneNumber) {
    try {
        const user = auth.currentUser;
        if (!user) throw new Error('No user logged in');
        
        const token = await user.getIdToken();
        const response = await axios.post(
            `${API_URL}/api/auth/register`,
            { 
                uid: user.uid,
                email: user.email,
                username, 
                phoneNumber, 
                displayName: user.displayName || username,
                photoURL: user.photoURL || '',
                provider: 'google' 
            },
            { headers: { Authorization: `Bearer ${token}` } }
        );
        
        setUserProfile(response.data.user);
        return response.data;
    } catch (error) {
        console.error('Complete profile error:', error);
        throw error;
    }
}

// Forgot password
function forgotPassword(email) {
    return auth.sendPasswordResetEmail(email);
}

// Logout
async function logout() {
    setUserProfile(null);
    return auth.signOut();
}

// Fetch user profile
async function fetchUserProfile() {
    try {
        const user = auth.currentUser;
        if (!user) return null;
        
        const token = await user.getIdToken();
        const response = await axios.get(
            `${API_URL}/api/users/profile?uid=${user.uid}`,
            { headers: { Authorization: `Bearer ${token}` } }
        );
        
        setUserProfile(response.data.user);
        return response.data.user;
    } catch (error) {
        console.error('Fetch profile error:', error);
        return null;
    }
}

// Update user profile
async function updateProfile(updates) {
    try {
        const user = auth.currentUser;
        if (!user) throw new Error('No user logged in');
        
        const token = await user.getIdToken();
        const response = await axios.put(
            `${API_URL}/api/users/profile`,
            {
                uid: user.uid,
                ...updates
            },
            { headers: { Authorization: `Bearer ${token}` } }
        );
        
        setUserProfile(response.data.user);
        return response.data;
    } catch (error) {
        console.error('Update profile error:', error);
        throw error;
    }
}

// Listen for auth state changes
useEffect(() => {   
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
        setcurrentUser(user);
        
        if (user) {
            // Fetch user profile from MongoDB
            await fetchUserProfile();
        } else {
            setUserProfile(null);
        }
        
        setLoading(false);
    });
    
    return unsubscribe;
}, []);

    const value = {
        currentUser,
        userProfile,
        signUp,
        login,
        signInWithGoogle,
        completeProfile,
        forgotPassword,
        logout,
        fetchUserProfile,
        updateProfile,
        getIdToken: () => getIdToken(currentUser)
    };
    
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

export default AuthProvider;
