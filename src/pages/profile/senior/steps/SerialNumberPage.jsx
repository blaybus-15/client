import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../../components/Button';

const SerialNumberPage = () => {
  const navigate = useNavigate();
  const [serialNumber, setSerialNumber] = useState('');

  useEffect(() => {
    // 일련번호 자동 생성 (예: SN-날짜-랜덤숫자)
    const today = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const randomNum = Math.floor(10000 + Math.random() * 90000); // 10000~99999
    setSerialNumber(`SN-${today}-${randomNum}`);
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(serialNumber).then(() => {
      alert('일련번호가 복사되었습니다.');
    });
  };

  return (
    <div className="flex flex-col justify-between min-h-screen px-6 pt-20 bg-white">
      <div className="flex-1 px-4">
        <div className="mb-6 head-semi-bold-24">
          어르신 정보 등록을 
          <br />
          완료했어요!
        </div>
        <div className="text-gray-3 mb-8 body-regular-16">
          어르신의 정보가 등록될 시 일련번호가 자동으로 생성되며
          <br />
          업무관리 시스템에서 일지 및 정보를 확인할 수 있습니다.
        </div>

        {/* 일련번호 박스 */}
        <div className="bg-gray-100 rounded-lg p-4 flex justify-between items-center">
          <span className="text-lg font-semibold text-gray-700">{serialNumber}</span>
          <button
            onClick={handleCopy}
            className="text-sm text-blue-500 hover:underline px-2"
          >
            복사하기
          </button>
        </div>
      </div>

      {/* 다음 버튼 */}
      <div className="p-4 sm:pb-16 md:pb-12">
        <Button text="다음" onClick={() => navigate('/profile/senior/success')} />
      </div>
    </div>
  );
};

export default SerialNumberPage;