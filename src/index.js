import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {Routes,Route} from 'react-router'
import {BrowserRouter} from 'react-router-dom'
// font awsome:
import 'font-awesome/css/font-awesome.min.css';

import Dashboard from './Pages/Dashboard'
import Login from './Pages/Login'
import Client from './Pages/Client';
import Product from './Pages/Product'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />}/>
        <Route path="/clients" element={<Client />}/>
        <Route path="/products" element={<Product />}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
