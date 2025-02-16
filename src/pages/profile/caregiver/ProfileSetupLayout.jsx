import React from 'react';
import { Outlet } from 'react-router-dom';
import ProgressBar from '../../../components/ProgressBar';

const ProfileSetupLayout = () => {
  return (
    <div className="flex flex-col max-w-2xl min-h-screen bg-white">
      <ProgressBar />
      <Outlet />
    </div>
  );
};

export default ProfileSetupLayout;
