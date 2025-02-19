import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Button from '../../../components/Button';
import KakaoIcon from '../../../assets/kakaotalk-icon.svg';
import { useSelector } from 'react-redux';
import Illustration from '../../../assets/auth.png';

const SocialAuthPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const userType = searchParams.get('type') || 'CAREGIVER';
  const role = useSelector((state) => state.auth.role);
  const handleKakaoStart = () => {
    console.log('kakao start');
  };

  const handleLogin = () => {
    navigate(`/login?type=${role}`);
  };

  const handleSignup = () => {
    if (role === 'CAREGIVER') {
      navigate('/signup/caregiver/profile');
    } else if (role === 'ADMIN') {
      navigate('/signup/admin/center/register');
    } else {
      navigate('/signup'); // 예외 처리
    }
  };

  return (
    <div className="flex flex-col justify-between min-h-screen px-6 pt-12 bg-white">
      <div className="flex flex-col flex-1 justify-evenly">
        <h2 className="head-semi-bold-24 text-dark text-left leading-[40px] mb-6">
          {role === 'ADMIN' ? (
            <>
              센터의 첫걸음,
              <br />
              다온과 함께 시작하세요!
            </>
          ) : (
            <>
              요양보호사의 첫걸음,
              <br />
              다온과 함께 시작하세요!
            </>
          )}
        </h2>
        <img src={Illustration} alt="일러스트" className="w-full h-auto" />
      </div>

      <div className="space-y-4">
        <button
          className="relative body-semi-bold-18 w-full py-4 bg-main text-black rounded-2xl transition hover:bg-opacity-80
                    flex items-center justify-center"
          onClick={handleKakaoStart}
        >
          <img
            src={KakaoIcon}
            alt="카카오 아이콘"
            className="absolute left-[15px] w-6 h-6"
          />
          <span>카카오로 시작하기</span>
        </button>
        <Button text="로그인 하기" onClick={handleLogin} />
      </div>

      <p className="text-center caption-regular-14 text-gray-2 my-4">
        다온이 처음이신가요?{' '}
        <span
          className="inline-block ml-5 text-dark font-semibold cursor-pointer"
          onClick={handleSignup}
        >
          회원가입하기
        </span>
      </p>
    </div>
  );
};

export default SocialAuthPage;
