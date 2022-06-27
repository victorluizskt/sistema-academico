import HeaderLabel from './common/components/Templates/Login';
import { Routes, Route } from 'react-router-dom';

import './App.css';


function App() {
  return (
    <Routes>
      <Route path='/login' element={<HeaderLabel/>} />
      <Route path='/register' element={<div>Oi</div>} />
    </Routes>
  )
}

export default App;
