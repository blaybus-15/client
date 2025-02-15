import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom';

import CaregiverSignup from './pages/auth/signup/CaregiverSignup';
import Step1 from './pages/auth/signup/caregiver/Step1';
import Step2 from "./pages/auth/signup/Step2";
import Step3 from "./pages/auth/signup/Step3";
import Success from './pages/auth/signup/Success';

import Login from './pages/auth/login/Login';
import NavBar from './components/NavBar';

const AppContent = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <div className="min-h-screen bg-gray-200">
      {!isHomePage && (
        <div className="fixed top-0 left-0 z-50 w-full">
          <div className="max-w-2xl mx-auto ">
            <NavBar />
          </div>
        </div>
      )}
      <div className={'max-w-2xl mx-auto'}>
        <Routes>
          <Route path="/" />
          <Route path="/signup/caregiver" element={<CaregiverSignup />} />
          <Route path="/signup/step1" element={<Step1 />} />
          <Route path='/signup/step2' element={<Step2 />} />
          <Route path="/signup/step3" element={<Step3 />} />
          <Route path="/signup/success" element={<Success />} />

          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
