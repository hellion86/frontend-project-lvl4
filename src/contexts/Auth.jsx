/* eslint-disable react/function-component-definition */
import React, { useState, createContext } from 'react';

export const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const au = JSON.parse(localStorage.getItem('userId'));
  const [loggedIn, setLoggedIn] = useState(au);
  const logIn = () => setLoggedIn(true);
  const logOut = () => {
    localStorage.removeItem('userId');
    setLoggedIn(false);
  };
  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <AuthContext.Provider value={{ loggedIn, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
