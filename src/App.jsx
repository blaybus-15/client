import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Step1 from "./pages/auth/signup/common/Step1";
import Step2 from "./pages/auth/signup/common/Step2";
import LoginPage from './pages/LoginPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/signup/step1" element={<Step1 />} />
        <Route path='/signup/step2' element={<Step2 />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
};

export default App;
