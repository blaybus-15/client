import React, { useState } from 'react';
import CalendarModal from '../../components/CalendarModal';

const TestPage = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedDates, setSelectedDates] = useState([]);
  return (
    <div className="flex flex-col items-center mt-10">
      <button onClick={() => setIsOpen(true)} className="px-4 py-2 bg-blue-500 text-white rounded-md">
        날짜 선택
      </button>

      {isOpen && (
        <CalendarModal
          title="시작 기간 날짜를 선택해주세요"
          onClose={() => setIsOpen(false)}
          onConfirm={(dates) => {
            console.log("선택된 날짜:", dates);
            setIsOpen(false);
          }}
          selectedDates={selectedDates}
          setSelectedDates={setSelectedDates}
          maxDays={7} // 선택 가능 최대일 설정 가능
        />
      )}
    </div>
  );
}

export default TestPage;
