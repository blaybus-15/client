import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateProfileData, nextStep } from '../../../../redux/profile/caregiverProfileSlice';
import Button from '../../../../components/Button';
import SalaryCalculator from '../../../../components/SalaryCalculator';

const MatchingSalaryPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [salaryData, setSalaryData] = useState(null);

  const handleNext = () => {
    if (salaryData && salaryData.amount > 0) {
      dispatch(
        updateProfileData({
          salaryType: salaryData.salaryType,
          salaryAmount: salaryData.amount,
        })
      );
      dispatch(nextStep());
      navigate('/profile/senior/serial-number');
    }
  };

  const handleSalaryChange = (data) => {
    setSalaryData(data);
  };

  return (
    <>
      <div className="flex-1 px-4 pt-20 bg-white">
        <div className="mb-[27px] head-semi-bold-24">
          매칭될 요양보호사의
          <br />
          급여를 입력해주세요.
        </div>
        <SalaryCalculator onChange={handleSalaryChange} />
      </div>

      <div className="p-4 pb-28 sm:pb-16 md:pb-12">
        <Button
          text={'다음'}
          onClick={handleNext}
          disabled={!salaryData || !salaryData.amount}
        />
      </div>
    </>
  );
};

export default MatchingSalaryPage;