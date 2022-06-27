import HeaderLabel from './common/components/Templates/Login';
import { Routes, Route, Link} from 'react-router-dom';

import './App.css';


function App() {
  return (
    <>
      <Routes >
        <Route path='/login' component={HeaderLabel}/>
      </Routes >
    </>
  );
}

export default App;
