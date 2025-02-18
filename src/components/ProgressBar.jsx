// components/ProgressBar.jsx
import React from 'react';
import { useSelector } from 'react-redux';

const ProgressBar = () => {
  const { currentStep, steps } = useSelector((state) => state.caregiverProfile);

  return (
    <div className="fixed left-0 right-0 max-w-2xl mx-auto bg-white top-10">
      <div className="container px-4 pt-3 marker:mx-auto">
        <div className="flex gap-1">
          {Object.keys(steps).map((step) => (
            <div
              key={step}
              className={`h-[6px] flex-1 rounded-full ${
                Number(step) <= currentStep ? 'bg-main' : 'bg-background-gray'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
