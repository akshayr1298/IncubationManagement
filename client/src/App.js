
import './App.css';
import SignupPages from './Pages/SignupPages';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginPages from './Pages/LoginPages';
import HomePages from './Pages/HomePages';
import UserProccessingPage from './Pages/UserProccessingPage';
import AdminLoginPage from './Pages/AdminLoginPage';
import AdminHomePage from './Pages/AdminHomePage';
import ProgressBarPages from './Pages/ProgressBarPages';
import BookingSlotePages from './Pages/BookingSlotePages';

function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>

        <Route path = '/signup' element = {<SignupPages/>}/>
        <Route path ='/login' element = {<LoginPages/>}/>
        <Route path ='/' element = {<HomePages/>}/>
        <Route path ='/proccessing' element= {<UserProccessingPage/>}/>
        <Route path ='/adminlogin' element={<AdminLoginPage/>}/>
        <Route path = '/adminhome' element={<AdminHomePage/>}/>
        <Route path = '/progress' element = {<ProgressBarPages/>}/>
        <Route path = '/booking' element = {<BookingSlotePages/>} />
        
      </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
