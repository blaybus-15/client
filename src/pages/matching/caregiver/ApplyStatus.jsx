import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import JobCard from '../../../components/matching/JobCard';
import ConfirmModal from '../../../components/modal/ConfirmModal';
import ResultPage from './ResultPage';
import jobPostings from '../../../data/jobPostings';

const ApplyStatus = () => {
  const [jobs, setJobs] = useState(jobPostings);
  const navigate = useNavigate();
  const [showResult, setShowResult] = useState(false);
  const [resultType, setResultType] = useState('');

  // 모달 상태 관리
  const [modalConfig, setModalConfig] = useState({
    isOpen: false,
    message: '',
    subMessage: '',
    onConfirm: () => {},
    jobId: null,
  });

  const handleBookmark = (jobId, newBookmarkState, event) => {
    if (event) {
      event.stopPropagation();
    }
    setJobs(
      jobs.map((job) =>
        job.id === jobId ? { ...job, isBookmarked: newBookmarkState } : job
      )
    );
  };

  const handleJobClick = (jobId) => {
    navigate(`/matching/jobs/${jobId}`);
  };

  // 모달 닫기 핸들러
  const handleCloseModal = () => {
    setModalConfig((prev) => ({ ...prev, isOpen: false }));
  };

  // 거절 버튼 핸들러
  const handleReject = (jobId, event) => {
    if (event) {
      event.stopPropagation();
    }
    setModalConfig({
      isOpen: true,
      message: '매칭을 거절하시겠습니까?',
      subMessage: '거절 시 해당 매칭은 취소됩니다.',
      onConfirm: () => {
        setResultType('reject');
        setShowResult(true);
        handleCloseModal();
      },
      jobId,
    });
  };

  // 수락 버튼 핸들러
  const handleAccept = (jobId, event) => {
    if (event) {
      event.stopPropagation();
    }
    setModalConfig({
      isOpen: true,
      message: '매칭을 수락하시겠습니까?',
      subMessage: '수락 시 해당 매칭이 확정됩니다.',
      onConfirm: () => {
        setResultType('accept');
        setShowResult(true);
        handleCloseModal();
      },
      jobId,
    });
  };

  // 결과 페이지가 표시되어야 하는 경우
  if (showResult) {
    return <ResultPage type={resultType} />;
  }

  return (
    <div className="min-h-screen bg-background-gray">
      <div className="max-w-2xl mx-auto">
        <div className="px-4 pt-16 pb-8">
          <h1 className="head-semi-bold-24">매칭 현황</h1>
        </div>

        {/* 리스트 영역 */}
        <div className="pb-24">
          <div className="space-y-3">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="p-4 bg-white cursor-pointer"
                onClick={() => handleJobClick(job.id)}
              >
                <JobCard
                  estimatedTime={job.estimatedTime}
                  status={job.status}
                  title={job.title}
                  location={`${job.location} · ${job.postedTime}`}
                  salary={job.salary}
                  duty={job.duty}
                  patientInfo={job.patientInfo}
                  workingHours={job.workingHours}
                  isNegotiable={job.isNegotiable}
                  isBookmarked={job.isBookmarked}
                  onBookmark={(newState, event) =>
                    handleBookmark(job.id, newState, event)
                  }
                  onReject={(event) => handleReject(job.id, event)}
                  onAccept={(event) => handleAccept(job.id, event)}
                />
              </div>
            ))}
          </div>
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

export default ApplyStatus;
