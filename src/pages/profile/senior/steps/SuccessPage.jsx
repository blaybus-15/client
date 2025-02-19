import Button from '../../../../components/Button';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import CheckIcon from '../../../../assets/check-icon.svg';

const SuccessPage = () => {
  const navigate = useNavigate();
  const handleOnClick = () => {
    navigate('/matching/center');
  };
  
  return (
    <div className="flex flex-col min-h-screen px-4 pt-12 bg-white justify-evenly">
      <div className="text-center mt-12">
        <h2 className="head-semi-bold-24 leading-[40px] text-dark">
          어르신 정보를
          <br />
          모두 등록했어요!
        </h2>
      </div>

      <div className="flex-1 flex items-center justify-center">
        <img
          src={CheckIcon}
          alt="체크 아이콘"
          className="w-40 h-40 self-center"
        />
      </div>

      <div className="w-full pb-12">
        <Button text="돌봄 연결로 가기" onClick={handleOnClick} />
      </div>
    </div>
  );
};

export default SuccessPage;
