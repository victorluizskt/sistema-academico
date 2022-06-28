import LoginUser from './common/components/Templates/Login';
import RegisterUser from './common/components/Templates/RegisterUser';
import HomePage from './common/components/Templates/HomePage';
import { Routes, Route } from 'react-router-dom';

import './App.css';


function App() {
  return (
    <Routes>
      <Route path='/login' element={<LoginUser/>} />
      <Route path='/register' element={<RegisterUser />} />
      <Route path='/home' element={<HomePage />} />
    </Routes>
  )
}

export default App;
