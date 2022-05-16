/* eslint-disable react/function-component-definition */
import React from 'react';
import {
  Routes,
  Route,
  Navigate,
  useLocation,
} from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Navbar, Button, Container } from 'react-bootstrap';
import Login from './Login/Login.jsx';
import Page404 from './404/Page404.jsx';
import Registration from './Registration/Registration.jsx';
import Chat from './Chat/Chat.jsx';
import useAuth from '../hooks/useAuth.jsx';

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
  const { t } = useTranslation();
  const auth = useAuth();
  return auth.loggedIn ? <Button onClick={auth.logOut}>{t('navBar.button.logout')}</Button> : null;
};

const App = () => (
  <div className="d-flex flex-column h-100">
    <Navbar bg="light" expand="lg" className="shadow-sm">
      <Container>
        <Navbar.Brand href="/">Hexlet Chat</Navbar.Brand>
        <LogOutButton />
      </Container>
    </Navbar>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Registration />} />
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
  </div>
);

export default App;
