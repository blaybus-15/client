import React, { useState } from 'react';

const SalaryCalculator = () => {
  const [salaryType, setSalaryType] = useState('시급');
  const [amount, setAmount] = useState('');
  const [showCalculator, setShowCalculator] = useState(false);

  const handleAmountChange = (e) => {
    const value = e.target.value;
    // 숫자만 입력 받음
    const numberOnly = value.replace(/[^\d]/g, '');
    // 3자리마다 콤마 추가
    const formatted = numberOnly.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    setAmount(formatted);
    setShowCalculator(formatted !== '');
  };

  return (
    <div className="w-full space-y-6">
      <div className="flex items-center space-x-2">
        {/* 드랍다운 */}
        <div className="relative">
          <select
            value={salaryType}
            onChange={(e) => setSalaryType(e.target.value)}
            className="px-4 py-2 pr-8 text-gray-700 border border-gray-200 rounded-lg appearance-none bg-gray-50 focus:outline-none focus:border-gray-400"
          >
            <option value="시급">시급</option>
            <option value="일급">일급</option>
            <option value="월급">월급</option>
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 pointer-events-none">
            <svg
              className="w-4 h-4 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
            </svg>
          </div>
        </div>

        {/* 급여 입력 */}
        <div className="flex-1">
          <div className="relative">
            <input
              type="text"
              value={amount}
              onChange={handleAmountChange}
              className="w-full px-4 py-2 pr-10 text-right border border-gray-200 rounded-lg bg-gray-50 focus:outline-none"
              placeholder="0"
            />
            <span className="absolute text-gray-500 transform -translate-y-1/2 right-4 top-1/2">
              원
            </span>
          </div>
        </div>
      </div>

      {/* 계산기 */}
      {/* TODO: 계산 로직 추가 필요 */}
      {showCalculator && (
        <div className="mt-6">
          <h3 className="mb-4 text-lg font-medium text-gray-800">
            정상금액 계산기
          </h3>
          <div className="p-4 space-y-3 bg-gray-100 rounded-lg">
            <div className="flex justify-between text-gray-600">
              <span>센터 수수료</span>
              <span>-51,000원</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>소득세</span>
              <span>-61,000원</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>지방세</span>
              <span>-6,210원</span>
            </div>
            <div className="flex justify-between pt-2 font-medium text-gray-800">
              <span>최종 정산 금액</span>
              <span>월급 1,921,000원</span>
            </div>
          </div>
          <p className="mt-2 text-sm text-gray-500">
            입력하신 시급,일급,건별을 월급으로 계산해 드립니다.
          </p>
        </div>
      )}
    </div>
  );
};

export default SalaryCalculator;
