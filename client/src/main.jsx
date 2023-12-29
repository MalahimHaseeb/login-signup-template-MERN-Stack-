import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import toast, { Toaster } from 'react-hot-toast';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './Login.jsx'
import Signup from './Signup'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/Login' element={<Login />} />
        {/* Add a route for Signup */}
        <Route path='/' element={<Signup />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  </React.StrictMode>,
)
