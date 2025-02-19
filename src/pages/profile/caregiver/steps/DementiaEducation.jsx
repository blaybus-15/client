import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  nextStep,
  updateProfileData,
} from '../../../../redux/profile/caregiverProfileSlice';
import CheckCard from '../../../../components/CheckCard';
import Button from '../../../../components/Button';

const DementiaEducation = () => {
  const [educated, setEducated] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSelect = (value) => {
    setEducated(value);
  };

  const handleNext = () => {
    if (educated !== null) {
      dispatch(updateProfileData({ educated }));
      dispatch(nextStep());
      navigate('/profile/caregiver/address');
    }
  };

  const options = [
    { id: 'yes', label: '예, 이수했어요.', value: true },
    { id: 'no', label: '아니요, 아직 못했어요.', value: false },
  ];

  return (
    <>
      <div className="flex-1 px-4 pt-20">
        <div className="mb-3 head-semi-bold-24">치매 교육을 받으셨나요?</div>
        <div className="mb-11 text-3 body-regular-16">
          국민 건강보험 공단에서 제공하는 치매 전문 교육을
          <br />
          이수하지 않은 경우 근무에 제한이 생길 수 있습니다.
        </div>

        <CheckCard
          value={educated}
          onChange={(value) => handleSelect(value)}
          yesLabel={options[0].label}
          noLabel={options[1].label}
        />
      </div>

      <div className="p-4 pb-28 sm:pb-16 md:pb-12">
        <Button
          text={'다음'}
          onClick={handleNext}
          disabled={educated === null}
        ></Button>
      </div>
    </>
  );
};

export default DementiaEducation;
