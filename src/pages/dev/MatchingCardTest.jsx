import React from 'react';
import JobCard from '../../components/matching/JobCard';
import CaregiverCard from '../../components/matching/CaregiverCard';
import CaregiverCardWithButtons from '../../components/matching/CaregiverCardWithButtons';
import WorkConditionsCard from '../../components/matching/WorkConditionsCard';
import WorkContentCard from '../../components/matching/WorkContentCard';
import SeniorInfoCard from '../../components/matching/SeniorInfoCard';
import WorkAreaMap from '../../components/matching/WorkAreaMap';
import SeniorCard from '../../components/matching/SeniorCard';
import SeniorMatchingStatus from '../../components/matching/SeniorMatchingStatus';

const MatchingCardTest = () => {
  return (
    <div className="px-4 py-16 space-y-3 ">
      <SeniorCard />
      <SeniorMatchingStatus />
      <JobCard
        title="[2등급 여자어르신] 테스트요양보호사 채용"
        location="강남구 · 약 1시간 전"
        salary="시급 10,300"
      />
      <CaregiverCard />
      <CaregiverCardWithButtons />
      <WorkConditionsCard />
      <WorkContentCard />
      <SeniorInfoCard />
      {/* <WorkAreaMap address={'서울특별시 광진구 능동로 209'} /> */}
    </div>
  );
};

export default MatchingCardTest;
