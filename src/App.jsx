import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom';

import CaregiverSignup from './pages/auth/signup/CaregiverSignup';
import Step1 from './pages/auth/signup/caregiver/Step1';
import Step2 from './pages/auth/signup/caregiver/Step2';
import SuccessPage from './pages/auth/signup/SuccessPage';

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
          <Route path="/auth/caregiver" element={<CaregiverSignup />} />
          <Route path="/signup/caregiver/step1" element={<Step1 />} />
          <Route path='/signup/caregiver/step2' element={<Step2 />} />
          <Route path="/signup/success" element={<SuccessPage />} />

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
