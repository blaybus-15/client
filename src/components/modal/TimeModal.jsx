import React, { useState, useRef } from 'react';
import CloseIcon from '../../assets/close-icon.svg';
import SelectableCard from '../SelectableCard';
import Button from '../Button';

const TimeModal = ({ title, onClose, onConfirm }) => {
  const [meridiem, setMeridiem] = useState('오전'); // 오전/오후 선택
  const [hour, setHour] = useState('12'); // 시 (기본값 12)
  const [minute, setMinute] = useState('00'); // 분 (기본값 00)

  const hourInputRef = useRef(null);
  const minuteInputRef = useRef(null);

  // 숫자 입력 제한 함수
  const handleHourChange = (e) => {
    let value = e.target.value.replace(/\D/g, ''); // 숫자만 허용
    if (value.length > 2) value = value.slice(0, 2); // 두 자리까지 입력 가능
    if (value > 12) value = '12'; // 12시간제 제한

    setHour(value);
    if (value.length === 2) {
      minuteInputRef.current?.focus(); // 자동으로 분 입력칸 이동
    }
  };

  const handleMinuteChange = (e) => {
    let value = e.target.value.replace(/\D/g, ''); // 숫자만 허용
    if (value.length > 2) value = value.slice(0, 2); // 두 자리까지 입력 가능
    if (value > 59) value = '59'; // 59분 제한

    setMinute(value);
  };

  const handleConfirm = () => {
    if (!hour || !minute) return;

    // 24시간제 변환
    let formattedHour = parseInt(hour, 10);

    if (meridiem === '오후' && formattedHour !== 12) {
      formattedHour += 12;
    } else if (meridiem === '오전' && formattedHour === 12) {
      formattedHour = 0;
    }

    // 숫자를 문자열로 변환 & 2자리로 맞추기
    const formattedTime = `${String(formattedHour).padStart(2, '0')}:${minute.padStart(2, '0')}`;

    onConfirm(formattedTime); // 24시간 형식으로 전달
    console.log(formattedTime);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30">
      <div className="w-[375px] h-auto bg-white rounded-t-[20px] shadow-lg flex flex-col px-6 py-4 relative">
        {/* 상단 타이틀 */}
        <div className="flex justify-between items-center border-b pb-3">
          <h2 className="body-semi-bold-18 text-gray-3">{title}</h2>
          <button onClick={onClose}>
            <img src={CloseIcon} alt="닫기" className="w-5 h-5" />
          </button>
        </div>

        {/* 클릭 안내 문구 */}
        <p className="caption-semi-bold-14 text-gray-3 mt-4">
          클릭해서 입력해주세요!
        </p>

        {/* 시간 선택 UI */}
        <div className="flex justify-between items-center gap-3 mt-3">
          {/* 오전/오후 선택 */}
          <SelectableCard
            items={['오전', '오후']}
            onSelect={(selected) =>
              setMeridiem(selected === 0 ? '오전' : '오후')
            }
            className="gap-3 flex-shrink-0"
            cols={1} // 세로 정렬
            selectedClassName="bg-background-point text-dark body-semi-bold-16 shadow-inner px-4 py-1.5"
            unselectedClassName="bg-background-gray text-gray-3 body-regular-16 hover:bg-gray-2/20 px-4 py-1.5"
          />

          {/* 시간 입력 박스 */}
          <div className="flex items-center justify-center flex-grow space-x-5">
            <input
              type="text"
              ref={hourInputRef}
              value={hour}
              onChange={handleHourChange}
              maxLength="2"
              className="w-24 h-24 head-semi-bold-32 text-center bg-background-gray border-none rounded-xl focus:outline-none"
            />
            <span className="text-4xl font-bold text-[#D9D9D9]">:</span>
            <input
              type="text"
              ref={minuteInputRef}
              value={minute}
              onChange={handleMinuteChange}
              maxLength="2"
              className="w-24 h-24 head-semi-bold-32 text-center bg-background-gray border-none rounded-xl focus:outline-none"
            />
          </div>
        </div>

        <Button
          text="다음"
          onClick={handleConfirm}
          disabled={!hour || !minute}
          className="w-full mt-10"
        />
      </div>
    </div>
  );
};

export default TimeModal;
