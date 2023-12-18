import './styles/index.css';

import App, { appTitle } from './App';

import AccountProvider from 'contexts/account/AccountProvider';
import AuthProvider from 'contexts/auth/AuthProvider';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom/client';

document.title = appTitle;
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
    <AuthProvider>
      <AccountProvider>
        <div className='animated-background'></div>
        <App className="root"></App>
      </AccountProvider>
    </AuthProvider>
  </BrowserRouter>
);
