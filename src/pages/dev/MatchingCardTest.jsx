import React from 'react';
import JobCard from '../../components/matching/JobCard';

const MatchingCardTest = () => {
  return (
    <div className="px-10 py-16">
      <JobCard
        title="[2등급 여자어르신] 테스트요양보호사 채용"
        location="강남구 · 약 1시간 전"
        salary="시급 10,300"
      />
    </div>
  );
};

export default MatchingCardTest;
