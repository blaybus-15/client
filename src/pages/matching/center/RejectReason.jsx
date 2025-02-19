import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/Button';
import LimitedTextField from '../../../components/LimitedTextField';

const RejectReason = ({ onSubmit }) => {
  const [introduce, setIntroduce] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleEdit = (value) => {
    setIntroduce(value);
  };

  const options = [
    { id: 'yes', label: '예, 가지고 있어요.', value: true },
    { id: 'no', label: '아니요, 아직 없어요.', value: false },
  ];

  return (
    <>
      <div className="flex-1 px-4 pt-20">
        <div className="mb-3 head-semi-bold-24 text-dark">
          매칭 취소한 이유가 무엇인가요?
        </div>
        <div className="mb-[28px] body-regular-16 text-gray-3">
          구인을 기다리고 있을 보호사님께
          <br />
          취소 사유를 말씀해주세요 :)
        </div>

        <div className="text-stone-900 text-lg font-medium font-['Pretendard'] leading-relaxed">
          취소 사유
        </div>
        <LimitedTextField value={introduce} onChange={handleEdit} />
      </div>

      <div className="p-4 pb-28 sm:pb-16 md:pb-12">
        <Button
          text={'작성완료'}
          onClick={onSubmit}
          disabled={introduce === ''}
        ></Button>
      </div>
    </>
  );
};

export default RejectReason;
