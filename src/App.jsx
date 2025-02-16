import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom';

import NavBar from './components/NavBar';
import SelectableCardTest from './pages/dev/SelectableCardTest';
import CheckCardTest from './pages/dev/CheckCardTest';
import AddressSearch from './pages/dev/AddressSearchTest';
import UserTypeSelectPage from './pages/home/UserTypeSelectPage';
import SignupStartPage from './pages/auth/common/SignupStartPage';
import LoginPage from './pages/auth/common/LoginPage';
import SocialAuthPage from './pages/auth/common/SocialAuthPage';
import ProfilePage from './pages/auth/caregiver/ProfilePage';
import CredentialsPage from './pages/auth/common/CredentialsPage';
import SignupCompletePage from './pages/auth/common/SignupCompletePage';
import CenterRegisterPage from './pages/auth/admin/CenterRegisterPage';
import CenterIntroPage from './pages/auth/admin/CenterIntroPage';

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
          <Route path="/" element={<UserTypeSelectPage />} />

          {/* 로그인 및 회원가입 공통 */}
          <Route path="/auth" element={<SocialAuthPage />} />
          <Route path="/login" element={<LoginPage />} />

          {/* 배포 시 dev 링크 삭제 */}
          <Route path="/dev/selectable-card" element={<SelectableCardTest />} />
          <Route path="/dev/check-card" element={<CheckCardTest />} />
          <Route path="/dev/address-search" element={<AddressSearch />} />

          {/* 회원가입 시작 페이지 (userType 기반 리디렉션) */}
          <Route path="/signup" element={<SignupStartPage />} />

          {/* 공통 회원가입 페이지 */}
          <Route path="/signup/credentials" element={<CredentialsPage />} />
          <Route path="/signup/complete" element={<SignupCompletePage />} />

          {/* 요양보호사 전용 회원가입 */}
          <Route path="/signup/caregiver/profile" element={<ProfilePage />} />

          {/* 관리자 전용 회원가입 */}
          <Route path="/signup/admin/register" element={<CenterRegisterPage />} />
          <Route path="/signup/admin/intro" element={<CenterIntroPage />} />

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
