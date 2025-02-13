import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import NavBar from './components/NavBar';

const AppContent = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <div className="min-h-screen bg-gray-200">
      {!isHomePage && (
        <div className="fixed top-0 left-0 z-50 w-full">
          <div className="max-w-3xl mx-auto ">
            <NavBar />
          </div>
        </div>
      )}
      <div className={'max-w-3xl mx-auto'}>
        <Routes>
          <Route path="/" />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
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
