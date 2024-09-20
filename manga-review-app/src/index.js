import React from 'react';
import ReactDOM from 'react-dom/client'; // Make sure this is correct
import './index.css'; // Make sure this file exists
import App from './App'; // Your main App component
import reportWebVitals from './reportWebVitals'; // Ensure this file exists

// Create a root element
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the App component
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Call reportWebVitals
reportWebVitals();
