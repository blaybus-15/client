import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Step1 from "./pages/auth/signup/common/Step1";
import LoginPage from './pages/LoginPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/signup/common/step1" element={<Step1 />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
};

export default App;
