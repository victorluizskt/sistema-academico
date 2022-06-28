import LoginUser from './common/components/Templates/Login';
import RegisterUser from './common/components/Templates/RegisterUser';
import { Routes, Route } from 'react-router-dom';

import './App.css';


function App() {
  return (
    <Routes>
      <Route path='/login' element={<LoginUser/>} />
      <Route path='/register' element={<RegisterUser />} />
    </Routes>
  )
}

export default App;
