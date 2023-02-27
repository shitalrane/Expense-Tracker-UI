import 'bootstrap/dist/css/bootstrap.min.css';

// import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import './css/App.css'

// import $ from 'jquery';
// import Popper from 'popper.js';



const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  // <React.StrictMode>
    <App />
  // </React.StrictMode>
);

