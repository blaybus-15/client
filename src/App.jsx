import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';

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
import CenterSearchPage from './pages/auth/admin/CenterSearchPage';
import CenterInfoPage from './pages/auth/admin/CenterInfoPage';
import ModalTest from './pages/dev/ModalTest';
import MatchingCardTest from './pages/dev/MatchingCardTest';

import ProfileSetup from './pages/profile/caregiver';
import SeniorProfileSetup from './pages/profile/senior';
import TestPage from './pages/dev/TestPage';
import BasicInfo from './pages/profile/senior/steps/BasicInfoPage';
import GenderSelectPage from './pages/profile/senior/steps/GenderSelectPage';
import CareDatePage from './pages/profile/senior/steps/CareDatePage';
import CareTimePage from './pages/profile/senior/steps/CareTimePage';
import DailyLivingPage from './pages/profile/senior/steps/DailyLivingPage';
import RequiredServicePage from './pages/profile/senior/steps/RequiredServicePage';
import MatchingSalaryPage from './pages/profile/senior/steps/MatchingSalaryPage';
import ApplyStatus from './pages/matching/caregiver/ApplyStatus';
import JobDetail from './pages/matching/caregiver/JobDetails';
import SeniorMatchingStatus from './pages/matching/center/SeniorMatchingStatus';
import SeniorDetails from './pages/matching/center/SeniorDetails';
import CaregiverList from './pages/matching/center/CaregiverList';
import CaregiverDetail from './pages/matching/center/CaregiverDetail';
import CaregiverProfile from './pages/matching/center/CaregiverProfile';
import WorkConfirmation from './pages/matching/center/WorkConfirmation';

const AppContent = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <div className="min-h-screen">
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
          <Route path="/dev/modal" element={<ModalTest />} />
          <Route path="/dev/test" element={<TestPage />} />
          <Route path="dev/matching-card" element={<MatchingCardTest />} />

          {/* 회원가입 시작 페이지 (userType 기반 리디렉션) */}
          <Route path="/signup" element={<SignupStartPage />} />

          {/* 공통 회원가입 페이지 */}
          <Route path="/signup/credentials" element={<CredentialsPage />} />
          <Route path="/signup/complete" element={<SignupCompletePage />} />

          {/* 요양보호사 전용 회원가입 */}
          <Route path="/signup/caregiver/profile" element={<ProfilePage />} />

          {/* 관리자 전용 회원가입 */}
          <Route
            path="/signup/admin/center/register"
            element={<CenterRegisterPage />}
          />
          <Route
            path="/signup/admin/center/search"
            element={<CenterSearchPage />}
          />
          <Route
            path="/signup/admin/center/intro"
            element={<CenterIntroPage />}
          />
          <Route
            path="/signup/admin/center/check"
            element={<CenterInfoPage />}
          />

          {/* 요양보호사 프로필 등록 페이지 */}
          <Route path="/profile/caregiver*" element={<ProfileSetup />} />
          <Route path="/profile/senior*" element={<SeniorProfileSetup />} />

          {/* 매칭 페이지 */}
          <Route path="/matching/caregiver" element={<ApplyStatus />} />
          <Route path="/matching/jobs/:id" element={<JobDetail />} />

          <Route path="/matching/center" element={<SeniorMatchingStatus />} />
          <Route path="/matching/senior/:id" element={<SeniorDetails />} />
          <Route
            path="/matching/center/caregiver-list"
            element={<CaregiverList />}
          />
          <Route path="/caregivers/:id" element={<CaregiverDetail />} />
          <Route
            path="/caregivers/:id/profile"
            element={<CaregiverProfile />}
          />
          <Route
            path="/caregivers/:id/work-confirmation"
            element={<WorkConfirmation />}
          />
        </Routes>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <AppContent />
      </Router>
    </Provider>
  );
};

export default App;
