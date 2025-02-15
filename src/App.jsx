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
import SelectableCardTest from './pages/dev/SelectableCardTest';
import CheckCardTest from './pages/dev/CheckCardTest';

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
      <div className={'max-w-2xl mx-auto pt-6'}>
        <Routes>
          <Route path="/" />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />

          {/* 배포 시 dev 링크 삭제 */}
          <Route path="/dev/selectable-card" element={<SelectableCardTest />} />
          <Route path="/dev/check-card" element={<CheckCardTest />} />
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
