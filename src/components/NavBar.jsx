import React from 'react';
import { useNavigate } from 'react-router-dom';

import ArrowIcon from '../assets/arrow-icon.svg';
import HomeIcon from '../assets/home-icon.svg';

const NavBar = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  const goHome = () => {
    navigate('/');
  };

  const pageTitles = {
    "/auth": "",
    "/login": "로그인",
    "/signup": "회원가입",
    "/signup/credentials": "회원가입",
    "/signup/complete": "가입완료",
    "/signup/caregiver/profile": "프로필 등록",
    "/signup/admin/center/register": "회원가입",
    "/signup/admin/center/search": "회원가입",
    "/signup/admin/center/intro": "회원가입",
    "/signup/admin/center/check": "회원가입",
  };

  const dynamicPageTitles = [
    { path: "/profile/caregiver", title: "프로필 등록" },
    { path: "/profile/senior", title: "어르신 정보 등록" },
  ];

  const getPageTitle = () => {
    // 정해진 경로에 매칭되는 제목 반환
    if (pageTitles[location.pathname]) {
        return pageTitles[location.pathname];
    }
    // `/profile/caregiver/*`, `/profile/senior/*` 와 같은 패턴 처리
    const match = dynamicPageTitles.find((entry) =>
        location.pathname.startsWith(entry.path)
    );
    return match ? match.title : "";
};

// 기본 흰색, 모달 열리면 투명
const getBackgroundColor = () => (isModalOpen ? "bg-transparent" : "bg-white");

return (
  <div className="flex items-center justify-between py-3 bg-white">

      <button onClick={() => navigate(-1)} className="pl-4 pr-4">
          <img src={ArrowIcon} alt="뒤로가기" />
      </button>

      <h2 className="body-medium-18 text-dark text-left flex-1">{getPageTitle()}</h2>

      <button onClick={() => navigate("/")} className="pr-4">
          <img src={HomeIcon} alt="홈" />
      </button>
  </div>
);
};


export default NavBar;
