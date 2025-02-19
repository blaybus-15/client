import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSeniorInfo } from '../../../../redux/seniorSlice';
import { format } from 'date-fns';
import CheckCard from '../../../../components/CheckCard';
import Button from '../../../../components/Button';
import CalendarModal from '../../../../components/modal/CalendarModal';

const CareDatePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [visitType, setVisitType] = useState(null); // "REGULAR" or "TEMPORARY"
  const [selectedDays, setSelectedDays] = useState([]); // 정기 방문 요일 선택
  const [startDate, setStartDate] = useState(''); // 단기 방문 시작일
  const [endDate, setEndDate] = useState(''); // 단기 방문 종료일
  const [isCalendarOpen, setIsCalendarOpen] = useState(false); // 캘린더 모달 상태
  const [selectingStartDate, setSelectingStartDate] = useState(true); // 시작/종료 선택 구분
  const [tempSelectedDates, setTempSelectedDates] = useState([]); // 임시 선택한 날짜

  const dispatchData = () => {
    if (visitType === 'REGULAR' && selectedDays.length === 0) {
      alert('요일을 최소 1개 이상 선택해주세요.');
      return;
    }

    if (visitType === 'TEMPORARY' && (!startDate || !endDate)) {
      alert('시작 기간과 종료 기간을 선택해주세요.');
      return;
    }

    dispatch(
      setSeniorInfo({
        visitType,
        visitDays: selectedDays,
        visitDates: [startDate, endDate],
      })
    );
    navigate('/profile/senior/care-time'); // 다음 페이지
  };

  const daysOfWeek = [
    { label: '월', value: 'MONDAY' },
    { label: '화', value: 'TUESDAY' },
    { label: '수', value: 'WEDNESDAY' },
    { label: '목', value: 'THURSDAY' },
    { label: '금', value: 'FRIDAY' },
    { label: '토', value: 'SATURDAY' },
    { label: '일', value: 'SUNDAY' },
  ];

  const handleSelectDay = (value) => {
    setSelectedDays((prev) =>
      prev.includes(value)
        ? prev.filter((day) => day !== value)
        : [...prev, value]
    );
  };

  const handleOpenCalendar = (isStart) => {
    setSelectingStartDate(isStart);
    setIsCalendarOpen(true);
  };

  const handleDateConfirm = () => {
    if (tempSelectedDates.length > 0) {
      const sortedDates = tempSelectedDates
        .map((date) => new Date(date)) // Date 객체로 변환
        .sort((a, b) => a - b); // 오름차순 정렬 (가장 빠른 날짜가 첫 번째, 가장 늦은 날짜가 마지막)

      if (selectingStartDate) {
        setStartDate(format(sortedDates[0], 'yyyy-MM-dd')); // ✅ 가장 빠른 날짜 저장
      } else {
        setEndDate(format(sortedDates[sortedDates.length - 1], 'yyyy-MM-dd')); // ✅ 가장 늦은 날짜 저장
      }
      setIsCalendarOpen(false);
    }
  };

  return (
    <div className="flex flex-col justify-evenly min-h-screen px-6 pt-12 bg-white">
      <div className="flex-1 px-4">
        <div className="mt-9 mb-8 head-semi-bold-24">
          어르신의 돌봄 날짜를
          <br />
          입력해 주세요.
        </div>

        <CheckCard
          value={visitType === 'REGULAR'}
          onChange={(value) => setVisitType(value ? 'REGULAR' : 'TEMPORARY')}
          yesLabel="정기적인 방문 (7일 이상 근무)"
          noLabel="단기적인 방문 (7일 미만 근무)"
        />
      </div>

      {/* 정기적인 방문 선택 시 */}
      {visitType === 'REGULAR' && (
        <div className="px-6 flex flex-col flex-1 justify-center">
          <div className="mt-6 mb-3 text-dark body-medium-18">돌봄 기간</div>
          <div className="flex space-x-5 justify-center">
            {daysOfWeek.map((day) => (
              <button
                key={day.value}
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  selectedDays.includes(day.value)
                    ? 'bg-background-point shadow-inner text-dark'
                    : 'bg-background-gray text-gray-3'
                }`}
                onClick={() => handleSelectDay(day.value)}
              >
                {day.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 단기적인 방문 선택 시 */}
      {visitType === 'TEMPORARY' && (
        <>
          <div className="px-6 flex flex-col flex-1">
            <div className="mt-6 mb-2 text-dark body-medium-18">돌봄 기간</div>
            <div className="flex justify-between">
              <button
                className="w-1/2 p-3 body-regular-16 text-dark rounded-md bg-background-gray"
                onClick={() => handleOpenCalendar(true)}
              >
                {startDate || '시작 기간'}
              </button>
              <span className="px-2 text-gray-2">-</span>
              <button
                className="w-1/2 p-3 body-regular-16 text-dark rounded-md bg-background-gray"
                onClick={() => handleOpenCalendar(false)}
              >
                {endDate || '종료 기간'}
              </button>
            </div>
          </div>
        </>
      )}

      <div className="p-4 sm:pb-16 md:pb-12">
        <Button
          text="다음"
          onClick={dispatchData}
          disabled={
            visitType === 'REGULAR'
              ? selectedDays.length === 0
              : !startDate || !endDate
          }
        />
      </div>

      {/* 캘린더 모달 */}
      {isCalendarOpen && (
        <div className="fixed inset-0 flex items-end justify-center bg-black bg-opacity-30">
          <CalendarModal
            title={
              selectingStartDate
                ? '시작 기간 날짜를 선택해주세요'
                : '종료 기간 날짜를 선택해주세요'
            }
            maxDays={7}
            onClose={() => setIsCalendarOpen(false)}
            onConfirm={handleDateConfirm}
            selectedDates={tempSelectedDates} // 선택한 날짜 리스트
            setSelectedDates={setTempSelectedDates}
          />
        </div>
      )}
    </div>
  );
};

export default CareDatePage;
