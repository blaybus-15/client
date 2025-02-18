import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  nextStep,
  updateProfileData,
} from '../../../../redux/profile/caregiverProfileSlice';
import Button from '../../../../components/Button';
import LimitedTextInput from '../../../../components/LimitedTextField';

const Introduction = () => {
  const [introduce, setIntroduce] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleEdit = (value) => {
    setIntroduce(value);
  };

  const handleNext = () => {
    if (introduce !== null) {
      dispatch(updateProfileData({ introduce }));
      dispatch(nextStep());
      navigate('/profile/caregiver/payment');
    }
  };

  const options = [
    { id: 'yes', label: '예, 가지고 있어요.', value: true },
    { id: 'no', label: '아니요, 아직 없어요.', value: false },
  ];

  return (
    <>
      <div className="flex-1 px-4 pt-16">
        <div className="mb-3 head-semi-bold-24 text-dark">
          한줄 소개를 입력해주세요.
        </div>
        <div className="mb-[28px] body-regular-16 text-gray-1">
          매칭에 도움이 될 수 있는 멘트를
          <br />
          자유롭게 작성해주세요!
        </div>

        <div className="text-stone-900 text-lg font-medium font-['Pretendard'] leading-relaxed">
          한줄 소개
        </div>
        <LimitedTextInput value={introduce} onChange={handleEdit} />
      </div>

      <div className="p-4 pb-28 sm:pb-16 md:pb-12">
        <Button
          text={'다음'}
          onClick={handleNext}
          disabled={introduce === ''}
        ></Button>
      </div>
    </>
  );
};

export default Introduction;
