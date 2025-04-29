import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MainPage } from './pages/login/MainPage';
import { RecoverPassword } from './pages/forgotPassword/RecoverPassword';
import { RecoverPassword as Second} from './pages/forgotPassword/SecondVersionRecover';
import { TopBarLoggedUser } from './components/TopBarLogguedUser/TopBarLogguedUser';
import { Sidebar as SidebarDirector } from './components/SidebarDirector/SidebarDirector';



function App() {
  return (
    <Router>
      <div className="AppContainer">
        <Routes>
          <Route path='/' element={<MainPage/>} />
          <Route path='/recover' element={<RecoverPassword />} />
          <Route path='/welcome' element={<Welcome />} />
          <Route path='/second' element={<Second />} />
        </Routes>
      </div>
    </Router>
  );
}

function Welcome() {
  const user = JSON.parse(localStorage.getItem("user")); // Convertir el JSON a objeto
  console.log(user);

  return (
    <div>
      <TopBarLoggedUser />
      {user.first_name === 'director' && (
        <>
          <SidebarDirector />
        </>
      )}
      {user.first_name === 'admin' && (
        <>
        </>
      )}
      {user.first_name === 'secretary' && (
        <>
        </>
      )}
      <div>
      </div>
    </div>
  );
}

export default App;