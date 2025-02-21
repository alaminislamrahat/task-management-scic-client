import {
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithPopup
} from "firebase/auth";
import React, { createContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase.init";

  export const FormContext = createContext(null);
  
const LoginContext = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
  
    const googleProvider = new GoogleAuthProvider();
    const googleLogin = () => {
      setLoading(true);
      return signInWithPopup(auth, googleProvider);
    };
  
  
    //   for save user
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);      
          setLoading(false);
        });
    
        return () => {
          return unsubscribe();
        };
      }, []);
  
    const obj = {
      googleLogin,
      user,
      setUser,
      loading,
      setLoading,
    };
  
    return <FormContext.Provider value={obj}>{children}</FormContext.Provider>;
  };
  
  export default LoginContext;