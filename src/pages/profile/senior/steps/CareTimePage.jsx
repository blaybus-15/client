import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSeniorInfo } from '../../../../redux/seniorSlice';
import TimeModal from '../../../../components/modal/TimeModal';
import Button from '../../../../components/Button';

const daysOfWeekMap = {
  MONDAY: '월',
  TUESDAY: '화',
  WEDNESDAY: '수',
  THURSDAY: '목',
  FRIDAY: '금',
  SATURDAY: '토',
  SUNDAY: '일',
};

const daysOfWeek = Object.keys(daysOfWeekMap);

const CareTimePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { visitType, visitDays, visitDates, careStartTime, careEndTime } =
    useSelector((state) => state.senior);

  const [isStartTimeModalOpen, setIsStartTimeModalOpen] = useState(false);
  const [isEndTimeModalOpen, setIsEndTimeModalOpen] = useState(false);

  const handleTimeSelect = (time, isStart) => {
    const [hour, minute] = time.split(':').map(Number);

    if (isStart) {
      dispatch(
        setSeniorInfo({ careStartTime: { hour, minute, second: 0, nano: 0 } })
      );
      setIsStartTimeModalOpen(false);
    } else {
      if (
        hour < careStartTime.hour ||
        (hour === careStartTime.hour && minute <= careStartTime.minute)
      ) {
        alert('종료 시간은 시작 시간 이후여야 합니다.');
        return;
      }
      dispatch(
        setSeniorInfo({ careEndTime: { hour, minute, second: 0, nano: 0 } })
      );
      setIsEndTimeModalOpen(false);
    }
  };

  const handleNext = () => {
    if (!careStartTime || !careEndTime) {
      alert('시작 시간과 종료 시간을 설정해주세요.');
      return;
    }
    navigate('/profile/senior/daily-living');
  };

  const isButtonDisabled =
    (!careStartTime?.hour && careStartTime?.hour !== 0) ||
    (!careEndTime?.hour && careEndTime?.hour !== 0);

  return (
    <div className="flex flex-col justify-between min-h-screen px-6 pt-12 bg-white">
      <div className="flex-1 px-4">
        <div className="mt-9 mb-8 head-semi-bold-24">
          어르신의 돌봄 시간을
          <br />
          입력해 주세요.
        </div>

        {/* 돌봄 기간 */}
        <div className="mb-12">
          <div className="text-dark body-medium-18 mb-3">돌봄 기간</div>
          {visitType === 'REGULAR' ? (
            <div className="flex justify-center space-x-3">
              {daysOfWeek.map((day) => (
                <button
                  key={day}
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    visitDays.includes(day)
                      ? 'bg-background-point shadow-inner text-dark'
                      : 'bg-background-gray text-gray-3'
                  }`}
                >
                  {daysOfWeekMap[day]}
                </button>
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <div className="flex justify-between">
                <button className="w-1/2 p-3 body-regular-16 text-dark rounded-md bg-background-gray">
                  {visitDates[0] || '시작 기간'}
                </button>
                <span className="px-2 text-gray-2">-</span>
                <button className="w-1/2 p-3 body-regular-16 text-dark rounded-md bg-background-gray">
                  {visitDates[1] || '종료 기간'}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* 돌봄 시간 */}
        <div className="mb-8">
          <div className="text-dark body-medium-18 mb-3">돌봄 시간</div>
          <div className="flex justify-between">
            <button
              className="w-1/2 p-3 body-regular-16 text-dark rounded-md bg-background-gray"
              onClick={() => setIsStartTimeModalOpen(true)}
            >
              {careStartTime
                ? `${careStartTime.hour.toString().padStart(2, '0')}:${careStartTime.minute
                    .toString()
                    .padStart(2, '0')}`
                : '시작 시간을 선택해주세요'}
            </button>
            <span className="px-2 text-gray-2">-</span>
            <button
              className="w-1/2 p-3 body-regular-16 text-dark rounded-md bg-background-gray"
              onClick={() => setIsEndTimeModalOpen(true)}
            >
              {careEndTime
                ? `${careEndTime.hour.toString().padStart(2, '0')}:${careEndTime.minute
                    .toString()
                    .padStart(2, '0')}`
                : '종료 시간을 선택해주세요'}
            </button>
          </div>
        </div>
      </div>

      {/* 다음 버튼 */}
      <div className="p-4">
        <Button text="다음" onClick={handleNext} disabled={isButtonDisabled} />
      </div>

      {/* 시간 선택 모달 */}
      {isStartTimeModalOpen && (
        <TimeModal
          title="시작 시간을 선택해주세요"
          onClose={() => setIsStartTimeModalOpen(false)}
          onConfirm={(time) => handleTimeSelect(time, true)}
        />
      )}

      {isEndTimeModalOpen && (
        <TimeModal
          title="종료 시간을 선택해주세요"
          onClose={() => setIsEndTimeModalOpen(false)}
          onConfirm={(time) => handleTimeSelect(time, false)}
        />
      )}
    </div>
  );
};

export default CareTimePage;
