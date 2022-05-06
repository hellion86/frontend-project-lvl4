/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable react/function-component-definition */
// eslint-disable-next-line no-unused-vars
import regeneratorRuntime from 'regenerator-runtime';
import React, { useState } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from 'react-router-dom';
import { Navbar, Button, Container } from 'react-bootstrap';
import Login from './Login/Login.jsx';
import Page404 from './404/Page404.jsx';
import Registration from './Registration/Registration.jsx';
import Chat from './Chat/Chat.jsx';
import AuthContext from '../contexts/index.jsx';
import useAuth from '../hooks/index.jsx';

const AuthProvider = ({ children }) => {
  const au = JSON.parse(localStorage.getItem('userId'));
  const [loggedIn, setLoggedIn] = useState(au);
  const logIn = () => setLoggedIn(true);
  const logOut = () => {
    localStorage.removeItem('userId');
    setLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ loggedIn, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

const PrivateRoute = ({ children }) => {
  const auth = useAuth();
  const location = useLocation();

  return auth.loggedIn ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }} />
  );
};

const LogOutButton = () => {
  const auth = useAuth();
  return auth.loggedIn ? <Button onClick={auth.logOut}>Выйти</Button> : null;
};

const App = () => (
  <div className="d-flex flex-column h-100">
    <AuthProvider>
      <BrowserRouter>
        <Navbar bg="light" expand="lg" className="shadow-sm">
          <Container>
            <Navbar.Brand href="/">Hexlet Chat</Navbar.Brand>
            <LogOutButton />
          </Container>
        </Navbar>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="*" element={<Page404 />} />
          <Route
            path="/"
            element={(
              <PrivateRoute>
                <Chat />
              </PrivateRoute>
            )}
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </div>
);

export default App;
