import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';
import { LanguageProvider } from './contexts/LanguageContext';

const helmetContext = {};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <HelmetProvider context={helmetContext}>
        <LanguageProvider>
          <App />
        </LanguageProvider>
      </HelmetProvider>
    </BrowserRouter>
  </React.StrictMode>
);
