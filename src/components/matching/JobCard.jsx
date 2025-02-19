import React, { useState } from 'react';
import { BsBookmarkFill } from 'react-icons/bs';
import Badge from '../Badge';

const JobCard = ({
  estimatedTime = '20분~30분',
  status = '대기중',
  title = '[2등급 여자어르신] 재가요양보호사 채용',
  location = '강남구 · 약 1시간 전',
  salary = '시급 10,300원',
  duty = '방문요양',
  patientInfo = '여성 2등급',
  workingHours = '주 5일근무, (오전) 9:00~ 16:00',
  isNegotiable = true,
  isBookmarked: initialBookmarkState = false,
  onBookmark,
  onReject = () => console.log('거절하기 클릭'),
  onAccept = () => console.log('수락하기 클릭'),
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

  const variant = {
    대기중: 'pending',
    완료함: 'completed',
    조율중: 'negotiating',
  };

  return (
    <div className="relative w-full bg-white">
      {/* 예상 소요시간 + 상태 뱃지 */}
      <Badge label="예상 도보 " value={estimatedTime} />
      <Badge
        label={status}
        variant={variant[status]}
        className="absolute right-16"
      />

      {/* 북마크 버튼 */}
      <button
        onClick={handleBookmarkClick}
        className="inline-flex absolute right-0 items-center justify-center px-1.5 py-1 text-xs font-medium bg-white border rounded border-[#E0E5EA] h-7 font-pretendard gap-1"
      >
        <BsBookmarkFill
          className={`w-4 h-4 ${isActive ? 'text-main' : 'text-gray-2'}`}
        />
        <span className="text-sm font-medium text-dark">저장</span>
      </button>

      {/* 메인 컨텐츠 */}
      <div>
        <h2 className="pr-8 pt-3 text-[#0081D1] body-semi-bold-18">{title}</h2>

        <p className="text-sm pt-[7px] text-gray-2">{location}</p>

        <div className="pt-3">
          <dl className="grid grid-cols-[30%_1fr] gap-y-2">
            <div className="body-regular-16 text-gray-3">급여</div>
            <div className="body-semi-bold-16 text-dark">{salary}</div>

            <div className="body-regular-16 text-gray-3">담당 업무</div>
            <div className="body-semi-bold-16 text-dark">{duty}</div>

            <div className="body-regular-16 text-gray-3">어르신정보</div>
            <div className="body-semi-bold-16 text-dark">{patientInfo}</div>

            <div className="body-regular-16 text-gray-3">근무 시간</div>
            <div className="body-semi-bold-16 text-dark">
              {workingHours}
              {isNegotiable && (
                <span className="ml-1">
                  <br />
                  요일 협의가능
                </span>
              )}
            </div>
          </dl>
        </div>
      </div>

      {/* 거절/수락 버튼 */}
      <div className="grid grid-cols-2 mt-4 gap-x-4">
        <button
          onClick={onReject}
          className="px-4 py-2 body-semi-bold-16 text-[#0081D1] bg-white rounded-lg shadow-innerblue"
        >
          거절
        </button>
        <button
          onClick={onAccept}
          className="px-4 py-2 rounded-lg body-semi-bold-16 text-dark bg-main"
        >
          수락
        </button>
      </div>
    </div>
  );
};

export default JobCard;
