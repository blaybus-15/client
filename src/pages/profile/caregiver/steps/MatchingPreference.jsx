import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  nextStep,
  updateProfileData,
} from '../../../../redux/profile/caregiverProfileSlice';
import Button from '../../../../components/Button';
import SelectableCard from '../../../../components/SelectableCard';

const MatchingPreference = () => {
  const [requiredKeywords, setRequiredKeywords] = useState([]); // 필수 조건
  const [optionalKeywords, setOptionalKeywords] = useState([]); // 선택 조건
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const messages = [
    '근무시간',
    '근무기간',
    '근무요일',
    '근무시간',
    '선호성별',
    '희망시급',
  ];

  const handleRequiredSelect = (selectedItems) => {
    setRequiredKeywords(selectedItems);
    console.log(
      '필수 조건:',
      selectedItems.map((index) => messages[index])
    );
  };

  const handleOptionalSelect = (selectedItems) => {
    setOptionalKeywords(selectedItems);
    console.log(
      '선택 조건:',
      selectedItems.map((index) => messages[index])
    );
  };

  const handleNext = () => {
    if (requiredKeywords.length >= 2) {
      // 필수 조건과 선택 조건을 합쳐서 저장
      const allKeywords = {
        required: requiredKeywords,
        optional: optionalKeywords,
      };

      dispatch(updateProfileData({ keywords: allKeywords }));
      dispatch(nextStep());
      navigate('/profile/caregiver/success');
    }
  };

  return (
    <>
      <div className="flex-1 px-4 pt-20">
        <div className="mb-3 head-semi-bold-24">
          매칭을 위한 조건을 선택해주세요!
        </div>
        <span className="text-gray-3 body-regular-16">
          요양보호사님과 어르신의 유사한 조건을
          <br />
          기준으로 매칭이 진행됩니다.
        </span>

        <div className="pt-[27px]">
          <span className="leading-relaxed text-dark body-medium-18">
            필수조건{' '}
          </span>
          <span className="text-[#FF5050] body-medium-18 leading-relaxed">
            *
          </span>
        </div>
        <div>
          <span className="text-gray-3 sub-regular-12">
            정확한 매칭을 위해{' '}
          </span>
          <span className="text-[#FF5050] sub-regular-12"> 2개 이상</span>
          <span className="text-gray-3 sub-regular-12"> 선택</span>
        </div>

        <SelectableCard
          items={messages}
          multiple={true}
          onSelect={handleRequiredSelect}
          selectedClassName="py-3 bg-background-point body-semi-bold-16 shadow-inner"
          unselectedClassName="py-3 bg-background-gray body-regular-16 hover:bg-gray-2/20"
        />

        <div className="pt-[27px] pb-2">
          <span className="leading-relaxed text-dark body-medium-18">
            선택조건
          </span>
        </div>

        <SelectableCard
          items={messages}
          multiple={true}
          onSelect={handleOptionalSelect}
          selectedClassName="py-3 bg-background-point body-semi-bold-16 shadow-inner"
          unselectedClassName="py-3 bg-background-gray body-regular-16 hover:bg-gray-2/20"
        />
      </div>

      <div className="p-4 pb-28 sm:pb-16 md:pb-12">
        <Button
          text={'완료'}
          onClick={handleNext}
          disabled={requiredKeywords.length < 2} // 필수 조건이 2개 미만이면 버튼 비활성화
        />
      </div>
    </>
  );
};

export default MatchingPreference;
