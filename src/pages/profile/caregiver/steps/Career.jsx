import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  nextStep,
  updateProfileData,
} from '../../../../redux/profile/caregiverProfileSlice';
import Button from '../../../../components/Button';
import SelectableCard from '../../../../components/SelectableCard';

const Career = () => {
  const [hasCareer, setHasCareer] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSelect = (value) => {
    setHasCareer(value);
    console.log(options[value]);
  };

  const handleNext = () => {
    if (hasCareer !== null) {
      dispatch(updateProfileData({ hasCareer }));
      dispatch(nextStep());
      navigate('/profile/caregiver/introduction');
    }
  };

  const options = ['신입이에요', '경력있어요'];

  return (
    <>
      <div className="flex-1 px-4 pt-24">
        <div className="mb-[27px] head-semi-bold-24">
          선생님의 경력을
          <br />
          선택해주세요.
        </div>
        <div className="mb-3 text-dark body-medium-18">경력</div>
        <SelectableCard
          items={options}
          multiple={false}
          onSelect={handleSelect}
          selectedClassName="py-3 bg-background-point body-semi-bold-16 shadow-inner"
          unselectedClassName="py-3 bg-background-gray body-regular-16 hover:bg-gray-2/20"
        />
      </div>

      <div className="p-4 pb-28 sm:pb-16 md:pb-12">
        <Button
          text={'다음'}
          onClick={handleNext}
          disabled={hasCareer === null}
        ></Button>
      </div>
    </>
  );
};

export default Career;
