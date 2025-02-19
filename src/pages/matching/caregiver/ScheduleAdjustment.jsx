import React, { useState } from 'react';
import TimeModal from '../../../components/modal/TimeModal';

const ScheduleAdjustment = ({ onSubmit }) => {
  const [selectedDays, setSelectedDays] = useState(['월', '화', '수', '목']);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [showTimeModal, setShowTimeModal] = useState(false);
  const [timeType, setTimeType] = useState(''); // 'start' or 'end'

  const days = ['월', '화', '수', '목', '금', '토', '일'];

  const handleDaySelect = (day) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter((d) => d !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };

  const handleTimeClick = (type) => {
    setTimeType(type);
    setShowTimeModal(true);
  };

  const handleTimeConfirm = (time) => {
    if (timeType === 'start') {
      setStartTime(time);
      // 시작 시간이 종료 시간보다 늦은 경우 종료 시간 초기화
      if (endTime && time >= endTime) {
        setEndTime('');
      }
    } else {
      // 종료 시간이 시작 시간보다 이른 경우 선택 방지
      if (!startTime || time > startTime) {
        setEndTime(time);
      }
    }
    setShowTimeModal(false);
  };

  const handleSubmit = () => {
    onSubmit({ selectedDays, startTime, endTime });
  };

  return (
    <div className="w-full min-h-screen bg-white">
      {/* Status Bar */}
      <div className="flex items-center justify-between w-full h-10 px-4 pt-4">
        <div className="text-lg font-semibold">19:02</div>
        <div className="flex gap-4">
          <div className="w-4 h-4">{/* Signal Icon */}</div>
          <div className="w-6 h-4">{/* Battery Icon */}</div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 pt-12">
        <h1 className="text-2xl font-semibold leading-10 text-stone-900">
          조율할 일정을 선택해 주세요.
        </h1>

        <p className="mt-4 mb-8 text-zinc-600">
          요일이나 시간 등의 조율을 요청하면
          <br />
          관리자가 검토하여 재매칭 안내드립니다.
        </p>

        {/* Working Days Selection */}
        <div className="mb-10">
          <h2 className="mb-3 text-lg font-medium text-stone-900">근무 요일</h2>
          <div className="flex gap-2.5">
            {days.map((day) => (
              <button
                key={day}
                onClick={() => handleDaySelect(day)}
                className={`px-3 py-1.5 rounded-full ${
                  selectedDays.includes(day)
                    ? 'bg-yellow-50 border border-yellow-300 text-stone-900'
                    : 'bg-zinc-100 text-zinc-600'
                }`}
              >
                <span className="text-lg font-medium">{day}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Working Hours Selection */}
        <div>
          <h2 className="mb-3 text-lg font-medium text-stone-900">근무 시간</h2>
          <div className="flex items-center">
            <div className="flex-1">
              <p className="mb-1 text-xs text-zinc-600">시작시간</p>
              <button
                onClick={() => handleTimeClick('start')}
                className="flex items-center justify-center w-full px-4 rounded-lg h-11 bg-zinc-100 text-dark"
              >
                {startTime || '시작 시간'}
              </button>
            </div>
            <div className="flex items-center justify-center w-9">
              <div className="w-4 h-px bg-zinc-200"></div>
            </div>
            <div className="flex-1">
              <p className="mb-1 text-xs text-zinc-600">종료시간</p>
              <button
                onClick={() => handleTimeClick('end')}
                className="flex items-center justify-center w-full px-4 rounded-lg text-dark h-11 bg-zinc-100"
                disabled={!startTime}
              >
                {endTime || '종료 시간'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Button */}
      <div className="bottom-0 left-0 right-0 p-6 ">
        <button
          onClick={handleSubmit}
          disabled={!startTime || !endTime || selectedDays.length === 0}
          className="w-full h-12 text-lg font-semibold bg-yellow-300 rounded-lg text-stone-900 disabled:opacity-50"
        >
          요청 하기
        </button>
      </div>

      {/* Time Selection Modal */}
      {showTimeModal && (
        <TimeModal
          title={`${timeType === 'start' ? '시작' : '종료'} 시간을 선택해주세요`}
          onClose={() => setShowTimeModal(false)}
          onConfirm={handleTimeConfirm}
        />
      )}
    </div>
  );
};

export default ScheduleAdjustment;
