import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  nextStep,
  updateProfileData,
} from '../../../../redux/profile/caregiverProfileSlice';
import Button from '../../../../components/Button';
import SelectableCard from '../../../../components/SelectableCard';

const Keywords = () => {
  const [selectedKeywords, setSelectedKeywords] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const messages = [
    '부지런해요',
    '재밌어요',
    '꼼꼼해요',
    '친근해요',
    '따뜻해요',
    '예민해요',
    '책임감 있어요',
    '노하우 많아요',
    '섬세해요',
    '사려깊어요',
    '차분해요',
    '인내심 있어요',
  ];

  const handleSelect = (selectedItems) => {
    setSelectedKeywords(selectedItems);
    console.log(selectedItems.map((index) => messages[index]));
  };

  const handleNext = () => {
    if (selectedKeywords.length > 0) {
      dispatch(updateProfileData({ keywords: selectedKeywords }));
      dispatch(nextStep());
      navigate('/profile/caregiver/career');
    }
  };

  return (
    <>
      <div className="flex-1 px-4 pt-12">
        <div className="mb-3 head-semi-bold-24">
          선생님을 나타낼 수 있는
          <br />
          키워드를 선택해주세요!
        </div>
        <div className="w-72 pb-[26px]">
          <span className="text-gray-1 body-regular-16">
            더 편안하게 일하실 수 있도록, 성향이 잘 맞는 어르신과
            매칭해드립니다.
          </span>
          <span className="text-gray-2 sub-regular-12"> (복수선택가능)</span>
        </div>

        <SelectableCard
          items={messages}
          multiple={true}
          onSelect={handleSelect}
          selectedClassName="py-3 bg-background-point body-semi-bold-16 shadow-inner"
          unselectedClassName="py-3 bg-background-gray body-regular-16 hover:bg-gray-2/20"
        />
      </div>

      <div className="p-4 pb-28 sm:pb-16 md:pb-12">
        <Button
          text={'다음'}
          onClick={handleNext}
          disabled={selectedKeywords.length === 0}
        />
      </div>
    </>
  );
};

export default Keywords;
