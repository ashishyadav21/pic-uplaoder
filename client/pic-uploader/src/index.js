import React from 'react';
import ReactDOmClient from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Routes } from "react-router-dom"
import { Auth0Provider } from '@auth0/auth0-react';


const root = ReactDOmClient.createRoot(document.getElementById('root'));
root.render(

  <React.StrictMode>
    <Auth0Provider
      domain="dev-q8ltgsggyov3ewxa.us.auth0.com"
      clientId="hmhjSi9Dzggn3WbBxObCBD0olxrS32a9"
      authorizationParams={{
        redirect_uri: window.location.origin
      }}
    >
      <Routes>
        <App />
      </Routes>
    </Auth0Provider>
  </React.StrictMode>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
