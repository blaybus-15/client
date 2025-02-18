import React, { useState } from 'react';
import CheckCard from '../../components/CheckCard';
import Dropdown from '../../components/Dropdown';

const CheckCardTest = () => {
  const [selections, setSelections] = useState({
    option1: null,
    option2: null,
    option3: null,
  });

  const handleSelect = (key, value) => {
    setSelections((prev) => ({
      ...prev,
      [key]: value,
    }));
  };
  
  const careLevels = ["NO_GRADE", "GRADE_1", "GRADE_2", "GRADE_3", "GRADE_4", "GRADE_5"];

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <h1 className="mb-8 text-2xl font-bold text-gray-900">
        CheckCard 컴포넌트 테스트
      </h1>

      <div className='space-y-4'>
        <Dropdown
        label='장기요양등급'
        title={'입력해 주세요.'}
        items={careLevels}
        onSelect={(value) => handleChange("careLevel", value)}
        style="bg-background-gray"
        />
      </div>

      <div className="space-y-4">
        <h1>질문1</h1>
        <CheckCard
          value={selections.option1}
          onChange={(value) => handleSelect('option1', value)}
          yesLabel="예, 취득했어요."
          noLabel="아니요, 아직 없어요."
        />

        <h1>질문2</h1>
        <CheckCard
          value={selections.option2}
          onChange={(value) => handleSelect('option2', value)}
          yesLabel="예, 가지고 있어요."
          noLabel="아니요, 아직 없어요."
        />

        <h1>질문3</h1>
        <CheckCard
          value={selections.option3}
          onChange={(value) => handleSelect('option3', value)}
          yesLabel="예, 이수 했어요."
          noLabel="아니요, 아직 없어요."
        />
      </div>

      <div className="p-4 mt-8 bg-white rounded-lg shadow">
        <h2 className="mb-2 text-lg font-semibold text-gray-700">현재 상태</h2>
        <pre className="p-4 bg-gray-100 rounded">
          {JSON.stringify(selections, null, 2)}
        </pre>
      </div>
    </div>
  );
};

export default CheckCardTest;
