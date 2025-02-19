import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import WorkConditionsCard from '../../../components/matching/WorkConditionsCard';
import WorkContentCard from '../../../components/matching/WorkContentCard';
import SeniorInfoCard from '../../../components/matching/SeniorInfoCard';
import WorkAreaMap from '../../../components/matching/WorkAreaMap';
import ConfirmModal from '../../../components/modal/ConfirmModal';
import jobDetails from '../../../data/jobDetails';
import Badge from '../../../components/Badge';
import { BsBookmarkFill } from 'react-icons/bs';
import ResultPage from './ResultPage';
import ScheduleAdjustment from './ScheduleAdjustment';

const JobDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const jobDetail = jobDetails[id];
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [resultType, setResultType] = useState('accept');
  const [showScheduleAdjustment, setShowScheduleAdjustment] = useState(false);

  // 모달 상태 관리
  const [modalConfig, setModalConfig] = useState({
    isOpen: false,
    message: '',
    subMessage: '',
    onConfirm: () => {},
  });

  if (!jobDetail) {
    return <div>정보를 찾을 수 없습니다.</div>;
  }

  const { basicInfo, workConditions, workContent, seniorInfo, workArea } =
    jobDetail;

  const handleBookmarkClick = () => {
    setIsBookmarked(!isBookmarked);
  };

  // 모달 닫기 핸들러
  const handleCloseModal = () => {
    setModalConfig((prev) => ({ ...prev, isOpen: false }));
  };

  // 거절 버튼 핸들러
  const handleReject = () => {
    setModalConfig({
      isOpen: true,
      message: '매칭을 거절하시겠습니까?',
      subMessage: '거절 시 해당 매칭은 취소됩니다.',
      onConfirm: () => {
        setResultType('reject');
        setShowResult(true);
        handleCloseModal();
      },
    });
  };

  // 조율요청 버튼 핸들러
  const handleNegotiate = () => {
    setModalConfig({
      isOpen: true,
      message: '매칭 조율을 요청하시겠습니까?',
      subMessage: '근무 조건 조율이 필요한 경우 요청해주세요.',
      onConfirm: () => {
        handleCloseModal();
        setShowScheduleAdjustment(true);
      },
    });
  };

  // 수락 버튼 핸들러
  const handleAccept = () => {
    setModalConfig({
      isOpen: true,
      message: '매칭을 수락하시겠습니까?',
      subMessage: '수락 시 해당 매칭이 확정됩니다.',
      onConfirm: () => {
        setResultType('accept');
        setShowResult(true);
        handleCloseModal();
      },
    });
  };

  const handleScheduleSubmit = (scheduleData) => {
    console.log('Schedule adjustment submitted:', scheduleData);
    setShowScheduleAdjustment(false); // 스케줄 조정 페이지 닫기
    setResultType('adjust');
    setShowResult(true);
  };

  // 결과 페이지 먼저 체크
  if (showResult) {
    return <ResultPage type={resultType} />;
  }

  // 그 다음 스케줄 조정 페이지 체크
  if (showScheduleAdjustment) {
    return <ScheduleAdjustment onSubmit={handleScheduleSubmit} />;
  }

  if (showScheduleAdjustment) {
    return <ScheduleAdjustment onSubmit={handleScheduleSubmit} />;
  }

  if (showResult) {
    return <ResultPage type={resultType} />;
  }

  if (showResult) {
    return <ResultPage type={resultType} />;
  }

  return (
    <div className="min-h-screen bg-background-gray">
      <div className="max-w-2xl mx-auto">
        <div className="top-0 z-10 flex items-center w-full h-12 px-4 bg-white"></div>

        {/* 상단 기본 정보 */}
        <div className="px-4 py-4 bg-white">
          <div className="relative flex items-center justify-between mb-2">
            <Badge label="예상 도보" value={basicInfo.estimatedTime} />
            {/* <Badge
              label={basicInfo.status}
              variant={
                basicInfo.status === '대기중'
                  ? 'pending'
                  : basicInfo.status === '조율중'
                    ? 'negotiating'
                    : 'completed'
              }
              className="mr-16"
            /> */}
            <button
              onClick={handleBookmarkClick}
              className="inline-flex items-center justify-center px-1.5 py-1 text-xs font-medium bg-white border rounded border-[#E0E5EA] h-7 font-pretendard gap-1"
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
          <button
            onClick={handleReject}
            className="py-3 body-semi-bold-16 text-[#0081D1] bg-white rounded-lg shadow-innerblue"
          >
            거절
          </button>
          <button
            onClick={handleNegotiate}
            className="py-3 rounded-lg body-semi-bold-16 text-dark bg-main"
          >
            조율요청
          </button>
          <button
            onClick={handleAccept}
            className="py-3 rounded-lg body-semi-bold-16 text-dark bg-main"
          >
            수락
          </button>
        </div>
      </div>

      {/* Confirm Modal */}
      <ConfirmModal
        isOpen={modalConfig.isOpen}
        onClose={handleCloseModal}
        onConfirm={modalConfig.onConfirm}
        message={modalConfig.message}
        subMessage={modalConfig.subMessage}
      />
    </div>
  );
};

export default JobDetail;
