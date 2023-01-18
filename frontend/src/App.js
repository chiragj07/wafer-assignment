import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Register } from './screens/Register';
import Login from './screens/Login';
import Home from './screens/Home';
import PhoneVerification from './screens/PhoneVerification';

function App() {
  return (
    <div className="App">
        <Router>
          <Routes>
            <Route path='/' element={<Register />}/>
            <Route path='/login' element={<Login />}/>
            <Route path='/home' element={<Home />} />
            <Route path='/verify-phone' element={<PhoneVerification />} />

          </Routes>

        </Router>
    </div>
  );
}

export default App;
