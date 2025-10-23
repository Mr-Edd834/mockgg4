import React, {useContext, useEffect, useState} from 'react';
import{auth} from '../Firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  onAuthStateChanged
} from 'firebase/auth';

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

function AuthProvider({children}) {
    const [currentUser, setcurrentUser] = useState();
    const [loading, setLoading] = useState(true);

function signUp(email, password) {
    return auth.createUserWithEmailAndPassword (email, password);
}
function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
}
function forgotPassword(email) {
    return auth.sendPasswordResetEmail(email);
}
function logout() {
    return auth.signOut();
}
useEffect(() => {   
const unsubscribe= auth.onAuthStateChanged(user => {

    setcurrentUser(user);
     setLoading(false);
});
return unsubscribe;
}, []);


    const value = {
        currentUser,
        signUp,
        login,
        forgotPassword,
        logout
    };
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

export default AuthProvider;
