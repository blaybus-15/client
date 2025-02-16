import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  nextStep,
  updateProfileData,
} from '../../../../redux/profile/caregiverProfileSlice';
import CheckCard from '../../../../components/CheckCard';
import Button from '../../../../components/Button';

const LicenseRegistration = () => {
  const [hasLicense, setHasLicense] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSelect = (value) => {
    setHasLicense(value);
  };

  const handleNext = () => {
    if (hasLicense !== null) {
      dispatch(updateProfileData({ hasLicense }));
      dispatch(nextStep());
      navigate('/profile/caregiver/dementia-education');
    }
  };

  const options = [
    { id: 'yes', label: '예, 취득했어요.', value: true },
    { id: 'no', label: '아니요, 아직 없어요.', value: false },
  ];

  return (
    <>
      <div className="flex-1 px-4 pt-16">
        <div className="mb-[68px] head-semi-bold-24">
          요양보호사 자격증이
          <br />
          있으신가요?
        </div>

        <CheckCard
          value={hasLicense}
          onChange={(value) => handleSelect(value)}
          yesLabel={options[0].label}
          noLabel={options[1].label}
        />
      </div>

      <div className="p-4 pb-28 sm:pb-16 md:pb-12">
        <Button
          text={'다음'}
          onClick={handleNext}
          disabled={hasLicense === null}
        ></Button>
      </div>
    </>
  );
};

export default LicenseRegistration;
