import React, { useContext, useEffect, useState } from 'react';
import { createContext } from "react";
import {
  onAuthStateChanged,
  getAuth,
} from 'firebase/auth';
import firebaseApp from '@/app/firebase/config';
import { getDataById } from '../firebase/db/db';

const auth = getAuth(firebaseApp);
export const UserContext = createContext({});
export const useUser = () => useContext(UserContext);

export default function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userDataFirebase, setUserDataFirebase] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      (async () => {
        try {
          const { result, error } = await getDataById(user.uid, 'users');

          if (result && !error) {
            setUserDataFirebase(result);
          }
        } catch (error) {
          console.error('Some error occured while getting user data ', error);
        } finally {
          setLoading(false);
        }
      })();
    });


    return () => unsubscribe();
  }, []);

  return (
    <UserContext.Provider value={{ user, userDataFirebase, loading }}>
      {children}
    </UserContext.Provider >
  )
}