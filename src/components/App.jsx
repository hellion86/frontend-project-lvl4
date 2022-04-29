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
import { Navbar, Button } from "react-bootstrap";
import Login from "./Login/Login.jsx";
import Page404 from "./404/Page404.jsx";
import Registration from "./Registration/Registration.jsx";
import Chat from "./Chat/Chat.jsx";
import AuthContext from "../contexts/index.jsx";
import useAuth from "../hooks/index.jsx";

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);

  const logIn = () => setLoggedIn(true);
  const logOut = () => {
    localStorage.removeItem('userId')
    setLoggedIn(false);
  }

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
  return auth.loggedIn ? <Button onClick={auth.logOut}>Log out</Button> : null;
};

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar variant="light" bg="light" expand="lg" className="shadow-sm">
          <Navbar.Brand>Hexlet Chat</Navbar.Brand>
          <LogOutButton />
        </Navbar>

        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="*" element={<Page404 />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Chat />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
