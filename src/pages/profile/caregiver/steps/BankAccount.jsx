import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  nextStep,
  updateProfileData,
} from '../../../../redux/profile/caregiverProfileSlice';
import Button from '../../../../components/Button';
import Dropdown from '../../../../components/Dropdown';
import InputField from '../../../../components/InputField';

// TODO: 은행 및 계좌번호 패턴 추후 utils로 이동
// 은행별 계좌번호 패턴
const BANK_PATTERNS = {
  신한은행: /^(\d{3}-\d{3}-\d{6}|\d{12})$/,
  국민은행: /^(\d{6}-\d{2}-\d{6}|\d{14})$/,
  우리은행: /^(\d{4}-\d{3}-\d{6}|\d{13})$/,
  하나은행: /^(\d{3}-\d{6}-\d{5}|\d{14})$/,
  기업은행: /^(\d{3}-\d{6}-\d{2}-\d{3}|\d{14})$/,
};

const BANKS = Object.keys(BANK_PATTERNS);

const BankAccount = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [bankData, setBankData] = useState({
    bank: '',
    accountNumber: '',
    accountHolder: '',
  });

  const [error, setError] = useState({
    accountNumber: '',
  });

  // 계좌번호 형식 검사
  const validateAccountNumber = (number, bank) => {
    if (!bank) return true; // 은행이 선택되지 않은 경우

    // 숫자와 하이픈만 허용
    const cleanNumber = number.replace(/[^\d-]/g, '');

    // 빈 값 체크
    if (!cleanNumber) return false;

    // 패턴 매칭
    const pattern = BANK_PATTERNS[bank];
    return pattern.test(cleanNumber);
  };

  // 계좌번호 자동 포맷팅
  const formatAccountNumber = (number, bank) => {
    // 숫자만 추출
    const cleanNumber = number.replace(/\D/g, '');

    switch (bank) {
      case '신한은행':
        return cleanNumber.replace(/(\d{3})(\d{3})(\d{6})/, '$1-$2-$3');
      case '국민은행':
        return cleanNumber.replace(/(\d{6})(\d{2})(\d{6})/, '$1-$2-$3');
      case '우리은행':
        return cleanNumber.replace(/(\d{4})(\d{3})(\d{6})/, '$1-$2-$3');
      case '하나은행':
        return cleanNumber.replace(/(\d{3})(\d{6})(\d{5})/, '$1-$2-$3');
      case '기업은행':
        return cleanNumber.replace(
          /(\d{3})(\d{6})(\d{2})(\d{3})/,
          '$1-$2-$3-$4'
        );
      default:
        return cleanNumber;
    }
  };

  const handleBankSelect = (value) => {
    setBankData((prev) => ({
      ...prev,
      bank: value,
      accountNumber: '', // 은행 변경시 계좌번호 초기화
    }));
    setError({ accountNumber: '' });
  };

  const handleAccountNumberChange = (e) => {
    const { value } = e.target;
    const formattedValue = formatAccountNumber(value, bankData.bank);

    setBankData((prev) => ({
      ...prev,
      accountNumber: formattedValue,
    }));

    // 유효성 검사
    if (!validateAccountNumber(formattedValue, bankData.bank)) {
      setError({
        accountNumber: '올바른 계좌번호 형식이 아닙니다.',
      });
    } else {
      setError({ accountNumber: '' });
    }
  };

  const handleAccountHolderChange = (e) => {
    setBankData((prev) => ({
      ...prev,
      accountHolder: e.target.value,
    }));
  };

  const isFormValid = () => {
    return (
      bankData.bank &&
      bankData.accountNumber &&
      bankData.accountHolder &&
      validateAccountNumber(bankData.accountNumber, bankData.bank) &&
      !error.accountNumber
    );
  };

  const handleNext = () => {
    if (isFormValid()) {
      dispatch(
        updateProfileData({
          bank: bankData.bank,
          accountNumber: bankData.accountNumber,
          accountHolder: bankData.accountHolder,
        })
      );
      dispatch(nextStep());
      navigate('/profile/caregiver/matching-preference');
    }
  };

  return (
    <>
      <div className="flex-1 px-4 pt-20">
        <div className="mb-[27px] head-semi-bold-24">
          정산 받을 계좌를
          <br />
          입력해주세요.
        </div>

        <div className="mb-3 text-dark body-medium-18">은행</div>
        <Dropdown
          title={'입력해 주세요.'}
          items={BANKS}
          onSelect={handleBankSelect}
          style="bg-background-gray"
          selected={bankData.bank}
        />

        <div className="mt-10 mb-3 text-dark body-medium-18">
          계좌번호
          <span className="sub-regular-12 text-gray-2">
            {' '}
            (숫자만 입력해주세요)
          </span>
        </div>
        <InputField
          placeholder={'입력해주세요.'}
          value={bankData.accountNumber}
          onChange={handleAccountNumberChange}
          error={error.accountNumber}
          maxLength={bankData.bank === '기업은행' ? 16 : 14}
        />
        {error.accountNumber && (
          <div className="mt-2 text-sm text-red">{error.accountNumber}</div>
        )}

        <div className="mt-10 mb-3 text-dark body-medium-18">예금주</div>
        <InputField
          placeholder={'입력해주세요.'}
          value={bankData.accountHolder}
          onChange={handleAccountHolderChange}
        />
      </div>

      <div className="p-4 pb-28 sm:pb-16 md:pb-12">
        <Button text={'다음'} onClick={handleNext} disabled={!isFormValid()} />
      </div>
    </>
  );
};

export default BankAccount;
