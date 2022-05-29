import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from "react-router-dom"

import CustomRoutes from './components/Route';
import { AuthProvider } from "./lib/auth";

import './styles/global.css'
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(
  document.getElementById('root')!)
  .render(
    <BrowserRouter>
      <React.StrictMode>
        <AuthProvider>
          <CustomRoutes />
        </AuthProvider>
      </React.StrictMode>
    </BrowserRouter>
  )
