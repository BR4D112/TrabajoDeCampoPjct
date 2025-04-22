//import { useState } from 'react'
import { MainPage } from './pages/login/MainPage'
import { RecoverPassword } from './pages/forgotPassword/RecoverPassword';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet, useNavigate } from 'react-router-dom';
import { RecoverPassword as Second} from './pages/forgotPassword/SecondVersionRecover';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<MainPage/> }/>
        <Route path='/recover' element={<RecoverPassword/> }/>
        <Route path='/welcome' element={<Welcome/> }/>
        <Route path='/second' element={<Second/> }/>
      </Routes>
    </Router>
  )
}
function Welcome() {
  const user = JSON.parse(localStorage.getItem("user")); // Convertir el JSON a objeto
  console.log(user);
  
  return (
    <div>
      <h1>Bienvenido</h1>
      <p>Esta es la página de bienvenida, {user?.first_name}.</p>
    </div>
  );
}
export default App;