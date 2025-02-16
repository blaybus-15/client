import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProfileSetupLayout from './ProfileSetupLayout';
import LicenseRegistration from './steps/LicenseRegistration';
import DementiaEducation from './steps/DementiaEducation';
import Vehicle from './steps/Vehicle';
// ... 다른 스텝 컴포넌트들 import

const ProfileSetup = () => {
  return (
    <Routes>
      <Route element={<ProfileSetupLayout />}>
        <Route index element={<Navigate to="license" replace />} />
        <Route path="license" element={<LicenseRegistration />} />
        <Route path="dementia-education" element={<DementiaEducation />} />
        <Route path="vehicle" element={<Vehicle />} />
        {/* ... 다른 스텝들의 라우트 */}
      </Route>
    </Routes>
  );
};

export default ProfileSetup;
