import React from 'react';
import ReactDOM from 'react-dom/client';
// import App from './App.tsx';
import './index.css';
import SPMApp from './SPMApp.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <div className="max-w-xl mx-auto">
      <SPMApp />
    </div>
  </React.StrictMode>
);
