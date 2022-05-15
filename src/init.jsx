import React from 'react';
import { Provider } from 'react-redux';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { BrowserRouter } from 'react-router-dom';
import i18n from 'i18next';
import io from 'socket.io-client';
import ru from './locales/ru.js';
import store from './slices/index.js';
import App from './components/App.jsx';
import ContentProvider from './contexts/Content.jsx';
import AuthProvider from './contexts/Auth.jsx';

const init = async () => {
  const i18nextInstance = i18n.createInstance();
  await i18nextInstance.use(initReactI18next).init({
    resources: {
      ru,
    },
    lng: 'ru',
    interpolation: {
      escapeValue: false,
    },
  });
  const socket = io();

  return (
    <Provider store={store}>
      <AuthProvider>
        <ContentProvider socket={socket}>
          <I18nextProvider i18={i18nextInstance}>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </I18nextProvider>
        </ContentProvider>
      </AuthProvider>
    </Provider>
  );
};

export default init;
