import React, { useContext, useEffect, useState } from 'react';
import { createContext } from "react";
import {
  onAuthStateChanged,
  getAuth,
} from 'firebase/auth';
import firebaseApp from '@/app/firebase/config';

const auth = getAuth(firebaseApp);
export const UserContext = createContext({});
export const useUser = () => useContext(UserContext);

export default function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <UserContext.Provider value={{ user, loading }}>
      {children}
    </UserContext.Provider >
  )
}