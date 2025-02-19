import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import JobCard from '../../../components/matching/JobCard';
import jobPostings from '../../../data/jobPostings';

const ApplyStatus = () => {
  const [jobs, setJobs] = useState(jobPostings);
  const navigate = useNavigate();

  const handleBookmark = (jobId, newBookmarkState) => {
    setJobs(
      jobs.map((job) =>
        job.id === jobId ? { ...job, isBookmarked: newBookmarkState } : job
      )
    );
  };

  const handleJobClick = (jobId) => {
    navigate(`/matching/jobs/${jobId}`);
  };

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
                  onBookmark={(newState) => {
                    handleBookmark(job.id, newState);
                    // 이벤트 버블링 방지
                    event.stopPropagation();
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplyStatus;
