import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { caregiverProfiles } from '../../../data/caregiverProfile';
import Badge from '../../../components/Badge';

const CaregiverDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const caregiver = caregiverProfiles.find((c) => c.id === Number(id));

  if (!caregiver) {
    return <div>요양보호사를 찾을 수 없습니다.</div>;
  }

  // 시간대 태그 컴포넌트
  const TimeTag = ({ text }) => (
    <span className="px-4 py-2 text-dark bg-[#FFF9D7] rounded-lg body-medium-16">
      {text}
    </span>
  );

  // 일반 태그 컴포넌트
  const Tag = ({ text }) => (
    <span className="px-4 py-2 text-dark bg-[#FFF9D7] rounded-lg body-medium-16">
      {text}
    </span>
  );

  const handleAcceptRequest = () => {
    navigate(`/caregivers/${id}/profile`); // 원하는 경로로 변경
  };

  return (
    <div className="min-h-screen pt-16 bg-white">
      {/* 헤더 */}
      <div className="px-4 pt-6">
        <div className="flex items-center gap-2">
          <h1 className="text-[#0081D1] head-semi-bold-24">
            {caregiver.basicInfo.name} 보호사님
          </h1>
          <span className="text-dark body-medium-16">
            {caregiver.basicInfo.age}
          </span>
        </div>

        {/* 위치 정보 */}
        <div className="flex items-center gap-2 px-4 py-3 mt-4 bg-gray-100 rounded-lg">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="#666">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
          </svg>
          <span className="text-dark body-medium-16">
            {caregiver.basicInfo.address} 위치 인증된 보호사입니다.
          </span>
        </div>
      </div>

      {/* 선호하는 시간대 */}
      <div className="px-4 mt-8">
        <h2 className="mb-4 text-dark head-medium-18">선호하는 시간대</h2>
        <div className="flex flex-wrap gap-2">
          {caregiver.preferredWork.workingDays.map((time, index) => (
            <TimeTag key={index} text={time} />
          ))}
        </div>
      </div>

      {/* 선호하는 시급 */}
      <div className="px-4 mt-8">
        <h2 className="mb-4 text-dark head-medium-18">선호하는 시급</h2>
        <Tag text="1만원 ~3만원 사이" />
      </div>

      {/* 선호하는 어르신 성별 */}
      <div className="px-4 mt-8">
        <h2 className="mb-4 text-dark head-medium-18">선호하는 어르신 성별</h2>
        <Tag text={caregiver.preferredWork.preferredGender} />
      </div>

      {/* 자격증 */}
      <div className="px-4 mt-8">
        <h2 className="mb-4 text-dark head-medium-18">자격증</h2>
        <div className="flex flex-wrap gap-2">
          {caregiver.certifications.map((cert, index) => (
            <Tag key={index} text={cert.name} />
          ))}
        </div>
      </div>

      {/* 경력 */}
      <div className="px-4 mt-8">
        <div className="flex items-center justify-between">
          <h2 className="text-dark head-medium-18">경력</h2>
          <button className="text-dark">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
            </svg>
          </button>
        </div>
        <p className="mt-2 text-[#0081D1] body-medium-16">
          총 경력 기간 {caregiver.career.totalExperience}
        </p>
        <p className="mt-2 text-dark body-medium-16">
          케어링크 근무
          <br />[{caregiver.career.details[0].duties}]
        </p>
      </div>

      {/* 차량 소유 여부 */}
      <div className="px-4 mt-8">
        <h2 className="mb-4 text-dark head-medium-18">차량 소유 여부</h2>
        <Tag text="차량 소유자" />
      </div>

      {/* 하단 버튼 */}
      <div className="bottom-0 left-0 right-0 p-4 bg-white ">
        <div className="flex gap-4">
          <button
            className="flex-1 px-4 py-3 text-[#0081D1] bg-white border border-[#0081D1] rounded-lg body-semi-bold-16"
            onClick={() => navigate(-1)} // 이전 페이지로 이동
          >
            요청 취소
          </button>
          <button
            className="flex-1 px-4 py-3 text-dark bg-[#FFE943] rounded-lg body-semi-bold-16"
            onClick={handleAcceptRequest}
          >
            요청 수락
          </button>
        </div>
      </div>
    </div>
  );
};

export default CaregiverDetail;
