import React, { useState } from 'react';
import { format, isSameDay } from 'date-fns';
import CloseIcon from '../../assets/close-icon.svg';

const CalendarModal = ({
  title,
  maxDays,
  onClose,
  onConfirm,
  selectedDates,
  setSelectedDates,
}) => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today);
  const [warningMessage, setWarningMessage] = useState('');

  const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];
  const firstDayOfMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
    1
  );
  const lastDayOfMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1,
    0
  );
  const daysInMonth = lastDayOfMonth.getDate();

  // 날짜 선택 핸들러
  const handleDateClick = (date) => {
    if (selectedDates.some((d) => isSameDay(d, date))) {
      // 이미 선택된 날짜라면 선택 해제
      setSelectedDates(selectedDates.filter((d) => !isSameDay(d, date)));
      return;
    }

    if (selectedDates.length >= maxDays) {
      setWarningMessage(`${maxDays}일 미만으로 선택해주세요`);
      setTimeout(() => setWarningMessage(''), 3000);
      return;
    }

    // 새로운 날짜 추가
    setSelectedDates([...selectedDates, date]);
  };

  // 이전 달 & 다음 달 이동
  const handlePrevMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1)
    );
  };

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30'>

        <div className="w-full max-w-md h-auto bg-white rounded-t-[20px] shadow-lg flex flex-col px-6 py-4 relative">
          {warningMessage && (
            <div
              className="absolute left-[20%] top-[-50px] 
                            transform -translate-x-1/2 
                            w-[223px] h-[38px] px-4 py-2 bg-background-point
                            border border-main rounded-md
                            flex items-center justify-center text-sm text-gray-3 
                            shadow-md whitespace-nowrap 
                            opacity-0 animate-[fadeIn_0.2s_ease-out_forwards]"
            >
              {warningMessage}
            </div>
          )}
    
          {/* 상단 타이틀 */}
          <div className="flex justify-between items-center border-b pb-3">
            <h2 className="body-semi-bold-18 text-gray-3">{title}</h2>
            <button onClick={onClose}>
              <img src={CloseIcon} alt="닫기" className="w-5 h-5" />
            </button>
          </div>
    
          <div className="flex justify-between items-center py-4">
            <span className="text-gray-700 text-sm font-semibold">
              {format(currentMonth, 'yyyy년 MM월')}
            </span>
    
            {selectedDates.length > 0 && (
              <span className="text-[#0081D1] text-sm font-semibold">
                {selectedDates.length > 1
                  ? `${format(selectedDates[0], 'M월 d일')} 외 ${selectedDates.length - 1}일`
                  : format(selectedDates[0], 'M월 d일')}
              </span>
            )}
          </div>
    
          <button
            onClick={handlePrevMonth}
            className="absolute top-1/2 left-1 transform -translate-y-1/2 p-2"
          >
            <svg
              width="8"
              height="15"
              viewBox="0 0 8 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7 13.5L0.999999 7.5L7 1.5"
                stroke="#B1B5B9"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
    
          <button
            onClick={handleNextMonth}
            className="absolute top-1/2 right-1 transform -translate-y-1/2 p-2"
          >
            <svg
              width="8"
              height="15"
              viewBox="0 0 8 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 1.5L7 7.5L1 13.5"
                stroke="#B1B5B9"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
    
          <div className="mt-2 px-1">
            <div className="grid grid-cols-7 gap-1 text-center">
              {daysOfWeek.map((day, index) => (
                <span
                  key={day}
                  className={`body-semi-bold-16 min-w-[36px] ${
                    index === 0
                      ? 'text-red'
                      : index === 6
                        ? 'text-[#24ABFF]'
                        : 'text-gray-3'
                  }`}
                >
                  {day}
                </span>
              ))}
            </div>
    
            <div className="grid grid-cols-7 gap-3 mt-2 text-gray-3">
              {[...Array(firstDayOfMonth.getDay())].map((_, i) => (
                <div key={`empty-${i}`} className="w-10 h-10"></div>
              ))}
              {[...Array(daysInMonth)].map((_, i) => {
                const date = new Date(
                  currentMonth.getFullYear(),
                  currentMonth.getMonth(),
                  i + 1
                );
                const isSelected = selectedDates.some((d) => isSameDay(d, date));
                const dayIndex = (firstDayOfMonth.getDay() + i) % 7; // 요일 인덱스 계산
    
                return (
                  <button
                    key={i}
                    onClick={() => handleDateClick(date)}
                    className={`w-10 h-10 rounded-full flex items-center justify-center min-w-[36px] ${
                      isSelected
                        ? 'bg-main text-dark'
                        : dayIndex === 0
                          ? 'text-red'
                          : dayIndex === 6
                            ? 'text-[#24ABFF]'
                            : 'hover:bg-gray-200'
                    }`}
                  >
                    {i + 1}
                  </button>
                );
              })}
            </div>
          </div>
    
          <button
            onClick={() => onConfirm(selectedDates)}
            disabled={selectedDates.length === 0}
            className={`w-full py-2 mt-4 rounded-lg ${
              selectedDates.length > 0
                ? 'bg-main text-dark'
                : 'bg-gray-2 text-white'
            }`}
          >
            확인
          </button>
        </div>
    </div>
  );
};
export default CalendarModal;
