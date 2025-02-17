import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import InputFieldWithButton from '../../../components/InputFieldWithButton';
import SearchInputField from '../../../components/SearchInputField';
import Button from '../../../components/Button';

const CenterRegisterPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [selectedCenter, setSelectedCenter] = useState(null);
  
  useEffect(() => {
    if (location.state?.selectedCenter) {
      setSelectedCenter(location.state.selectedCenter);
    }
  }, [location.state]);

  const handleSearchClick = () => {
    navigate('/signup/admin/center/search');
  };

  const handleNext = () => {
    navigate('/signup/admin/intro');
  };

  
  return (
    <div className="flex flex-col justify-evenly min-h-screen px-6 pt-12 bg-white">
      <div className="w-full rounded-lg flex flex-col mt-12 justify-evenly">
          <h2 className="head-semi-bold-24 leading-[40px] text-left mb-8">
              관리하실 센터를<br/>검색해주세요.
          </h2>
      </div>

      <div className="flex flex-col flex-1 justify-start">
        <p className="body-medium-18 pb-3">센터</p>
          <SearchInputField
            placeholder='센터 이름을 입력해주세요.'
            buttonText='검색'
            value={selectedCenter?.centerName}
            onClick={handleSearchClick}
          />

          <p className='mt-2 text-caption-regular-14 text-gray-1'>
            입력하신 선생님의 개인정보는 회원가입 목적 외에는 다른 용도로 사용되지 않습니다.
          </p>
      </div>

      <div className="mb-5 justify-end">
        <Button text="다음" onClick={handleNext} disabled={!selectedCenter} />
      </div>
    </div>
  );
};

export default CenterRegisterPage;
