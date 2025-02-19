import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import jobPostings from '../../../data/jobDetails';
import SeniorMatchingStatusCard from '../../../components/matching/SeniorMatchingStatusCard';

const SeniorMatchingStatus = () => {
  // Object.values() 대신 Object.entries()를 사용하여 [id, data] 형태로 변환
  const [seniors] = useState(
    Object.entries(jobPostings).map(([id, data]) => ({
      ...data,
      id, // id 값을 보존
    }))
  );
  const navigate = useNavigate();

  const handleSeniorClick = (id) => {
    navigate(`/matching/senior/${id}`);
  };

  return (
    <div className="min-h-screen bg-background-gray">
      <div className="max-w-2xl mx-auto">
        <div className="px-4 pt-16 pb-8">
          <h1 className="head-semi-bold-24">어르신 목록</h1>
        </div>

        <div className="pb-24">
          <div className="space-y-3">
            {seniors.map((senior) => (
              <div
                key={senior.id}
                className="p-4 bg-white cursor-pointer"
                onClick={() => handleSeniorClick(senior.id)}
              >
                <SeniorMatchingStatusCard
                  name={senior.seniorInfo.name}
                  birthDate={senior.seniorInfo.birthDate}
                  gender={senior.seniorInfo.gender}
                  address={senior.workArea.address}
                  grade={senior.seniorInfo.grade}
                  status={senior.basicInfo.status}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeniorMatchingStatus;
