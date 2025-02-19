import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ProfileSetupLayout from "../senior/ProfileSetupLayout";
import BasicInfoPage from "./steps/BasicInfoPage";
import GenderSelectPage from "./steps/GenderSelectPage";
import CareDatePage from "./steps/CareDatePage";
import CareTimePage from "./steps/CareTimePage";
import DailyLivingPage from "./steps/DailyLivingPage";
import RequiredServicePage from "./steps/RequiredServicePage";
import MatchingSalaryPage from "./steps/MatchingSalaryPage";
import SerialNumberPage from "./steps/SerialNumberPage";
import SuccessPage from "./steps/SuccessPage";

const SeniorProfileSetup = () => {
    return (
      <Routes>
        <Route element={<ProfileSetupLayout />}>
          <Route index element={<Navigate to="basic" replace />} />
          <Route path="basic" element={<BasicInfoPage/>} />
          <Route path="gender-select" element={<GenderSelectPage />} />
          <Route path="care-date" element={<CareDatePage />} />
          <Route path="care-time" element={<CareTimePage />} />
          <Route path="daily-living" element={<DailyLivingPage />} />
          <Route path="require-service" element={<RequiredServicePage />} />
          <Route path="match-salary" element={<MatchingSalaryPage />} />
          <Route path="/serial-number" element={<SerialNumberPage />} />
          <Route path='/success' element={<SuccessPage />} />
        </Route>
      </Routes>
    );
  };
  
  export default SeniorProfileSetup;