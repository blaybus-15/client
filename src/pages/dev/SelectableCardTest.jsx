import React from 'react';
import SelectableCard from '../../components/SelectableCard';
import SearchBar from '../../components/SearchBar';
import InputFieldWithButton from '../../components/InputFieldWithButton';
import SalaryCalculator from '../../components/SalaryCalculator';
import { Input } from 'postcss';

const SelectableCardTest = () => {
  const singleSelectItems = [
    '단일 선택 1',
    '단일 선택 2',
    '단일 선택 3',
    '단일 선택 4',
  ];

  const multiSelectItems = [
    '다중 선택 1',
    '다중 선택 2',
    '다중 선택 3',
    '다중 선택 4',
    '다중 선택 5',
    '다중 선택 6',
  ];

  const customStyleItems = [
    '커스텀 스타일 1',
    '커스텀 스타일 2',
    '커스텀 스타일 3',
    '커스텀 스타일 4',
    '커스텀 스타일 5',
    '커스텀 스타일 6',
  ];

  return (
    <div className="container px-4 py-8 mx-auto">
      <InputFieldWithButton />
      <h1 className="mb-8 text-2xl font-bold">
        SelectableCard 컴포넌트 테스트
      </h1>

      <div className="space-y-8">
        <section>
          <h2 className="mb-4">단일 선택 테스트</h2>
          <SelectableCard
            items={singleSelectItems}
            multiple={false}
            onSelect={(selected) => console.log('단일 선택:', selected)}
          />
        </section>

        <section>
          <h2 className="mb-4">다중 선택 테스트</h2>
          <SelectableCard
            items={multiSelectItems}
            multiple={true}
            onSelect={(selected) => console.log('다중 선택:', selected)}
          />
        </section>

        <section>
          <h2 className="mb-4">커스텀 스타일 테스트</h2>
          <SelectableCard
            items={customStyleItems}
            multiple={true}
            selectedClassName="bg-green-500 text-white"
            unselectedClassName="bg-gray-50 hover:bg-gray-100"
            cols={5}
            onSelect={(selected) => console.log('커스텀 스타일:', selected)}
          />
        </section>
      </div>
    </div>
  );
};

export default SelectableCardTest;
