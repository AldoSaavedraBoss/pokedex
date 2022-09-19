import { createContext, useContext, useState, useEffect } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  setPersistence,
  browserLocalPersistence,
} from 'firebase/auth';
import { auth } from '../firebase';

export const useAuth = () => {
  const context = useContext(authContext);
  return context;
};

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    onAuthStateChanged(auth, dataUser => {
      setUser(dataUser);
    });
  }, []);

  const register = async (email, password) => {
    await setPersistence(auth, browserLocalPersistence);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const login = async (email, password) => {
    await setPersistence(auth, browserLocalPersistence);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => signOut(auth);

  return (
    <authContext.Provider value={{ register, login, user, logout, selected, setSelected }}>
      {children}
    </authContext.Provider>
  );
};

export default AuthProvider;
export const authContext = createContext();
