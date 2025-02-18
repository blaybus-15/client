import React, { useState, useEffect } from 'react';

const SalaryCalculator = ({ onChange }) => {
  const [salaryType, setSalaryType] = useState('시급');
  const [amount, setAmount] = useState('');
  const [showCalculator, setShowCalculator] = useState(false);
  const [calculations, setCalculations] = useState({
    monthlyAmount: 0,
    centerFee: 0,
    incomeTax: 0,
    localTax: 0,
    finalAmount: 0,
  });

  const handleAmountChange = (e) => {
    const value = e.target.value;
    const numberOnly = value.replace(/[^\d]/g, '');
    const formatted = numberOnly.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    setAmount(formatted);
    setShowCalculator(formatted !== '');

    // 부모 컴포넌트에 값 전달
    if (onChange) {
      onChange({
        salaryType,
        amount: formatted ? parseInt(numberOnly, 10) : 0,
        showCalculator: formatted !== '',
      });
    }
  };

  const calculateSalary = () => {
    // 콤마 제거하고 숫자로 변환
    const rawAmount = parseInt(amount.replace(/,/g, ''), 10);

    // 월급으로 환산
    let monthlyAmount = rawAmount;
    if (salaryType === '시급') {
      // 시급 -> 월급 (하루 8시간, 한달 22일 기준)
      monthlyAmount = rawAmount * 8 * 22;
    } else if (salaryType === '일급') {
      // 일급 -> 월급 (한달 22일 기준)
      monthlyAmount = rawAmount * 22;
    }

    // 각종 공제액 계산
    const centerFee = Math.floor(monthlyAmount * 0.15); // 센터 수수료 15%
    const incomeTax = Math.floor(monthlyAmount * 0.033); // 소득세 3.3%
    const localTax = Math.floor(incomeTax * 0.1); // 지방세 (소득세의 10%)
    const finalAmount = monthlyAmount - centerFee - incomeTax - localTax;

    setCalculations({
      monthlyAmount,
      centerFee,
      incomeTax,
      localTax,
      finalAmount,
    });
  };

  // amount나 salaryType이 변경될 때마다 계산 실행
  useEffect(() => {
    if (amount) {
      calculateSalary();
    }
    // 급여 유형이 변경될 때도 부모 컴포넌트에 알림
    if (onChange) {
      onChange({
        salaryType,
        amount: amount ? parseInt(amount.replace(/,/g, ''), 10) : 0,
        showCalculator: amount !== '',
      });
    }
  }, [amount, salaryType]);

  // 숫자 포맷팅 함수
  const formatNumber = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  return (
    <div className="w-full space-y-4">
      <div className="body-medium-18 text-dark">급여</div>

      <div className="flex items-center space-x-2">
        <div className="relative body-regular-16 text-dark">
          <select
            value={salaryType}
            onChange={(e) => setSalaryType(e.target.value)}
            className="px-4 py-2 pr-8 border rounded-lg appearance-none bg-background-gray focus:outline-none"
          >
            <option value="시급">시급</option>
            <option value="일급">일급</option>
            <option value="월급">월급</option>
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-gray-1">
            <svg
              className="w-4 h-4 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
            </svg>
          </div>
        </div>

        <div className="flex-1 body-regular-16">
          <div className="relative">
            <input
              type="text"
              value={amount}
              onChange={handleAmountChange}
              className="w-full px-4 py-2 pr-10 text-right border rounded-lg bg-background-gray focus:outline-none text-dark"
              placeholder="0"
            />
            <span className="absolute transform -translate-y-1/2 text-gray-2 right-4 top-1/2">
              원
            </span>
          </div>
        </div>
      </div>

      {showCalculator && (
        <div className="mt-6">
          <div className="mb-4 body-medium-18 text-dark">정상금액 계산기</div>
          <div className="p-4 space-y-3 rounded-lg shadow-inner bg-background-point round-point">
            <div className="flex justify-between text-gray-1">
              <span>센터 수수료</span>
              <span>-{formatNumber(calculations.centerFee)}원</span>
            </div>
            <div className="flex justify-between text-gray-1">
              <span>소득세</span>
              <span>-{formatNumber(calculations.incomeTax)}원</span>
            </div>
            <div className="flex justify-between text-gray-1">
              <span>지방세</span>
              <span>-{formatNumber(calculations.localTax)}원</span>
            </div>
            <div className="flex justify-between pt-2 body-semi-bold-18">
              <span className="text-gray-1">최종 정산 금액</span>
              <span className="text-dark">
                {salaryType} {formatNumber(calculations.finalAmount)}원
              </span>
            </div>
          </div>
          <p className="mt-2 text-caption-regular-14 text-gray-1">
            입력하신 시급,일급,건별을 월급으로 계산해 드립니다.
          </p>
        </div>
      )}
    </div>
  );
};

export default SalaryCalculator;
