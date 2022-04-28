/* eslint-disable */
import React from "react";
import { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap/scss/bootstrap.scss";
import { Button, Navbar, Nav } from "react-bootstrap";
import Login from "./Login/Login.jsx";
import Page404 from "./404/Page404.jsx";
import Registration from "./Registration/Registration.jsx";

import AuthContext from "../contexts/index.jsx";
import useAuth from "../hooks/index.jsx";
import Chat from "./Chat/Chat.jsx";

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);

  const logIn = () => setLoggedIn(true);
  const logOut = () => setLoggedIn(false);

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
    <Navigate to="/chat" state={{ from: location }} />
  );
};

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar variant="light" bg="white" expand="lg" className="shadow-sm" >
          <Navbar.Brand href="/">Hexlet Chat</Navbar.Brand>
        </Navbar>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
