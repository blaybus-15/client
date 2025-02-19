import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import WorkConditionsCard from '../../../components/matching/WorkConditionsCard';
import WorkContentCard from '../../../components/matching/WorkContentCard';
import SeniorInfoCard from '../../../components/matching/SeniorInfoCard';
import WorkAreaMap from '../../../components/matching/WorkAreaMap';
import jobDetails from '../../../data/jobDetails';
import Badge from '../../../components/Badge';
import { BsBookmarkFill } from 'react-icons/bs';

const JobDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const jobDetail = jobDetails[id];
  const [isBookmarked, setIsBookmarked] = React.useState(false);

  if (!jobDetail) {
    return <div>정보를 찾을 수 없습니다.</div>;
  }

  const { basicInfo, workConditions, workContent, seniorInfo, workArea } =
    jobDetail;

  const handleBookmarkClick = () => {
    setIsBookmarked(!isBookmarked);
  };

  return (
    <div className="min-h-screen bg-background-gray">
      <div className="max-w-2xl mx-auto">
        <div className="top-0 z-10 flex items-center w-full h-12 px-4 bg-white"></div>

        {/* 상단 기본 정보 */}
        <div className="px-4 py-4 bg-white">
          <div className="flex items-center justify-between mb-2">
            <Badge label="예상 도보" value={basicInfo.estimatedTime} />
            <Badge
              label={basicInfo.status}
              variant={
                basicInfo.status === '대기중'
                  ? 'pending'
                  : basicInfo.status === '조율중'
                    ? 'negotiating'
                    : 'completed'
              }
              className="mr-16"
            />
            <button
              onClick={handleBookmarkClick}
              className="inline-flex absolute right-4 items-center justify-center px-1.5 py-1 text-xs font-medium bg-white border rounded border-[#E0E5EA] h-7 font-pretendard gap-1"
            >
              <BsBookmarkFill
                className={`w-4 h-4 ${isBookmarked ? 'text-main' : 'text-gray-2'}`}
              />
              <span className="text-sm font-medium text-dark">저장</span>
            </button>
          </div>
          <h2 className="mb-1 body-semi-bold-18 text-[#0081D1]">
            {basicInfo.title}
          </h2>
          <p className="text-xs text-gray-2 font-weight-500">
            {basicInfo.location} · {basicInfo.postedTime}
          </p>
          <div className="flex flex-wrap gap-2 mt-3">
            {basicInfo.tags.map((tag, index) => (
              <span
                key={index}
                className="px-2.5 py-[3px] text-[#0081D1] bg-white border border-[#0081D1] rounded text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* 컨텐츠 */}
        <div className="mt-4 space-y-4">
          <div className="px-4 py-4 bg-white">
            <WorkConditionsCard {...workConditions} />
          </div>
          <div className="px-4 py-4 bg-white">
            <WorkContentCard {...workContent} />
          </div>
          <div className="px-4 py-4 bg-white">
            <SeniorInfoCard {...seniorInfo} />
          </div>
          <div className="px-4 py-4 bg-white">
            <WorkAreaMap {...workArea} />
          </div>
        </div>

        {/* 하단 버튼 */}
        <div className="grid grid-cols-3 px-4 pb-24 mt-4 gap-x-2">
          <button className=" py-3 body-semi-bold-16 text-[#0081D1] bg-white rounded-lg shadow-innerblue">
            거절
          </button>
          <button className="py-3 rounded-lg body-semi-bold-16 text-dark bg-main">
            조율요청
          </button>
          <button className="py-3 rounded-lg body-semi-bold-16 text-dark bg-main">
            수락
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobDetail;
