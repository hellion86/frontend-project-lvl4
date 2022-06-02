import React from 'react';
import { Provider, ErrorBoundary } from '@rollbar/react';
import * as ReactRedux from 'react-redux';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { BrowserRouter } from 'react-router-dom';
import i18n from 'i18next';
import ru from './locales/ru.js';
import store from './slices/index.js';
import App from './components/App.jsx';
import ContentProvider from './contexts/Content.jsx';
import AuthProvider from './contexts/Auth.jsx';

const init = async (socket, rollbarConfig) => {
  const i18nextInstance = i18n.createInstance();
  await i18nextInstance.use(initReactI18next).init({
    resources: { ru },
    lng: 'ru',
    interpolation: { escapeValue: false },
  });

  return (
    <ReactRedux.Provider store={store}>
      <AuthProvider>
        <ContentProvider socket={socket}>
          <I18nextProvider i18={i18nextInstance}>
            <BrowserRouter>
              <Provider config={rollbarConfig}>
                <ErrorBoundary>
                  <App />
                </ErrorBoundary>
              </Provider>
            </BrowserRouter>
          </I18nextProvider>
        </ContentProvider>
      </AuthProvider>
    </ReactRedux.Provider>
  );
};

export default init;
