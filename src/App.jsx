//import { useState } from 'react'
import { MainPage } from './pages/login/MainPage'
import { RecoverPassword } from './pages/forgotPassword/RecoverPassword';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet, useNavigate } from 'react-router-dom';
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<MainPage/> }/>
        <Route path='/recover' element={<RecoverPassword/> }/>
      </Routes>
    </Router>
  )
}

export default App;