import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import ProgressBar from '../../../components/ProgressBar';
import {
  setCurrentStep,
  pathToStepMapping,
} from '../../../redux/profile/seniorStepSlice';

const ProfileSetupLayout = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    // URL 경로에서 현재 스텝 추출
    const currentPath = location.pathname.split('/').pop();
    const currentStep = pathToStepMapping[currentPath];

    if (currentStep) {
      dispatch(setCurrentStep(currentStep));
    }
  }, [location, dispatch]);

  return (
    <div className="flex flex-col max-w-2xl min-h-screen bg-white">
      <ProgressBar stepSliceName="seniorStep"/>
      <Outlet />
    </div>
  );
};

export default ProfileSetupLayout;
