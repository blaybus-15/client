import React, { useState } from 'react';
import { BsBookmarkFill } from 'react-icons/bs';
import Badge from '../Badge';
import CaregiverCard from './CaregiverCard';

const CaregiverCardWithButtons = ({
  caregiverName = '김은정',
  caregiverLocation = '서울시 강남구 거주',
  caregiverBirthDate = '1970-02-23',
  caregiverPhone = '010-1234-5678',
  caregiverGender = '여',
  caregiverCarDescription = '차량 소지',
  caregiverEducationStatus = '교육 이수 완료',
  estimatedTime = '20분~30분',
  status = '대기중',
  isBookmarked: initialBookmarkState = false,
  onBookmark,
}) => {
  // 북마크 상태를 내부적으로 관리
  const [isActive, setIsActive] = useState(initialBookmarkState);

  const handleBookmarkClick = () => {
    const newState = !isActive;
    setIsActive(newState);
    // 상위 컴포넌트에도 변경된 상태 전달
    if (onBookmark) {
      onBookmark(newState);
    }
  };

  return (
    <div className="relative w-full bg-white ">
      {/* 예상 소요시간 + 상태 뱃지 */}
      <Badge label="예상 도보 " value={estimatedTime} />
      <Badge label={status} variant="pending" className="absolute right-20" />

      {/* 북마크 버튼 */}
      <button
        onClick={handleBookmarkClick}
        className="inline-flex absolute right-4 items-center justify-center px-1.5 py-1 text-xs font-medium bg-white border rounded border-[#E0E5EA] h-7 font-pretendard gap-1"
      >
        <BsBookmarkFill
          className={`w-4 h-4 ${isActive ? 'text-main' : 'text-gray-2'}`}
        />
        <span className="text-sm font-medium text-dark">저장</span>
      </button>

      {/* CaregiverCard 컴포넌트 */}
      <CaregiverCard
        name={caregiverName}
        location={caregiverLocation}
        birthDate={caregiverBirthDate}
        phone={caregiverPhone}
        gender={caregiverGender}
        carDescription={caregiverCarDescription}
        educationStatus={caregiverEducationStatus}
      />
    </div>
  );
};

export default CaregiverCardWithButtons;
