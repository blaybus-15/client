import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  nextStep,
  updateProfileData,
} from '../../../../redux/profile/caregiverProfileSlice';
import Button from '../../../../components/Button';
import SalaryCalculator from '../../../../components/SalaryCalculator';

const Payment = () => {
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
      navigate('/profile/caregiver/bank-account');
    }
  };

  const handleSalaryChange = (data) => {
    setSalaryData(data);
  };

  return (
    <>
      <div className="flex-1 px-4 pt-16">
        <div className="mb-[27px] head-semi-bold-24">
          선생님의 희망 급여를
          <br />
          입력해주세요.
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

export default Payment;
