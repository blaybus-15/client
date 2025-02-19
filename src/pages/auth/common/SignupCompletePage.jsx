import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Button from '../../../components/Button';
import { useDispatch, useSelector } from 'react-redux';
import Illustration from '../../../assets/complete.png';

const SignupCompletePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [searchParams] = useSearchParams();
  const userType = searchParams.get('type') || 'CAREGIVER';
  const role =
    useSelector((state) => state.auth.role) ||
    localStorage.getItem('role') ||
    userType;

  const handleNext = () => {
    if (role === 'CAREGIVER') {
      navigate('/profile/caregiver');
    } else {
      navigate('/profile/senior');
    }
  };

  return (
    <div className="flex flex-col justify-evenly min-h-screen px-6 pt-12 bg-white">
      <div className="flex flex-col flex-1 items-center text-center mt-7 ">
        <h2 className="head-semi-bold-24 leading-[40px] text-dark">
          {role === 'CAREGIVER' ? (
            <>
              프로필 등록하고
              <br />
              집근처 일자리 정보를
              <br />
              찾아보세요!
            </>
          ) : (
            <>
              어르신의 정보를 입력하고
              <br />
              간편하게 업무 관리를
              <br />
              해보세요!
            </>
          )}
        </h2>

        <img
          src={Illustration}
          alt="일러스트"
          className="min-h-full max-h-[60vh] flex justify-center items-center"
        />
      </div>

      <div className="mb-5 justify-end">
        <Button
          text={
            role === 'CAREGIVER'
              ? '프로필 등록하러 가기'
              : '어르신 정보 입력하러 가기'
          }
          onClick={handleNext}
        />
      </div>
    </div>
  );
};

export default SignupCompletePage;
