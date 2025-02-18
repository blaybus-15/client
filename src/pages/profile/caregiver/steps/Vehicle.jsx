import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  nextStep,
  updateProfileData,
} from '../../../../redux/profile/caregiverProfileSlice';
import CheckCard from '../../../../components/CheckCard';
import Button from '../../../../components/Button';

const Vehicle = () => {
  const [hasVehicle, setHasVehicle] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSelect = (value) => {
    setHasVehicle(value);
  };

  const handleNext = () => {
    if (hasVehicle !== null) {
      dispatch(updateProfileData({ hasVehicle }));
      dispatch(nextStep());
      navigate('/profile/caregiver/keywords');
    }
  };

  const options = [
    { id: 'yes', label: '예, 가지고 있어요.', value: true },
    { id: 'no', label: '아니요, 아직 없어요.', value: false },
  ];

  return (
    <>
      <div className="flex-1 px-4 pt-20">
        <div className="mb-3 head-semi-bold-24">차량을 소지하고 있나요?</div>
        <div className="mb-11 text-gray-1 body-regular-16">
          차량 소지 여부를 통해 조건이 맞는 <br />
          어르신과 매칭이 됩니다.
        </div>

        <CheckCard
          value={hasVehicle}
          onChange={(value) => handleSelect(value)}
          yesLabel={options[0].label}
          noLabel={options[1].label}
        />
      </div>

      <div className="p-4 pb-28 sm:pb-16 md:pb-12">
        <Button
          text={'다음'}
          onClick={handleNext}
          disabled={hasVehicle === null}
        ></Button>
      </div>
    </>
  );
};

export default Vehicle;
