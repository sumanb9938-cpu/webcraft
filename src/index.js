import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// The correction is here: We are importing 'App.jsx' to be explicit.
import App from './App.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

