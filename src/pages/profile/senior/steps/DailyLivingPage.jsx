import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSeniorInfo } from '../../../../redux/seniorSlice';
import SelectableCard from '../../../../components/SelectableCard';
import Button from '../../../../components/Button';

const DailyLivingPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { mobilityLevel, eatingLevel, medicalConditions } = useSelector((state) => state.senior);

  const handleSelect = (key, value) => {
    dispatch(setSeniorInfo({ [key]: value }));
  };

  const isButtonDisabled = !mobilityLevel || !eatingLevel || medicalConditions.length === 0;

  return (
    <div className="flex flex-col justify-between min-h-screen px-6 pt-12 bg-white">
      <div className="flex-1 px-4">
        <div className="mt-9 mb-8 head-semi-bold-24">
          어르신의 일상생활 능력을
          <br />
          입력해 주세요.
        </div>

        {/* 스스로 거동이 가능한가요? */}
        <div className="mb-6">
          <div className="text-dark body-medium-18 mb-3">스스로 거동이 가능한가요?</div>
          <SelectableCard
            items={['스스로 가능함', '부축 필요/휠체어 이용', '거동불가 (와상)']}
            onSelect={(index) =>
              handleSelect('mobilityLevel', ['INDEPENDENT', 'NEEDS_ASSISTANCE', 'IMMOBILE'][index])
            }
            className="grid-cols-1 md:grid-cols-3"
          />
        </div>

        {/* 스스로 식사가 가능한가요? */}
        <div className="mb-6">
          <div className="text-dark body-medium-18 mb-3">스스로 식사가 가능한가요?</div>
          <SelectableCard
            items={['스스로 가능함', '식사 도움 필요', '콧줄/뱃줄 이용']}
            onSelect={(index) =>
              handleSelect('eatingLevel', ['INDEPENDENT', 'NEEDS_HELP', 'TUBE_FEEDING'][index])
            }
            className="grid-cols-1 md:grid-cols-3"
          />
        </div>

        {/* 질환 정보 선택 */}
        <div className="mb-6">
          <div className="text-dark body-medium-18 mb-3">질환 정보를 선택해주세요. (복수 선택 가능)</div>
          <SelectableCard
            items={[
              '해당 없음', '뇌경색', '루게릭', '욕창(체위변경)', '위장병', '우울증',
              '관절염/디스크', '자궁질환', '정신질환', '말기암', '치매(인지/섬망)',
              '파킨슨', '녹내장', '전염성질환'
            ]}
            multiple
            onSelect={(selectedIndexes) => {
              const conditionKeys = [
                'NONE', 'STROKE', 'LEUKEMIA',
                'BEDSORES', 'GASTRIC_DISEASE', 'DEPRESSION',
                'ARTHRITIS_DISK', 'UTERINE_DISEASE', 'MENTAL_ILLNESS',
                'APHASIA', 'DEMENTIA', 'PARKINSONS',
                'GLAUCOMA', 'INFECTIOUS_DISEASE'
              ];
              handleSelect('medicalConditions', selectedIndexes.map(index => conditionKeys[index]));
            }}
            className="grid-cols-2 md:grid-cols-4"
          />
        </div>
      </div>

      {/* 다음 버튼 */}
      <div className="p-4">
        <Button text="다음" onClick={() => navigate('/require-service')} disabled={isButtonDisabled} />
      </div>
    </div>
  );
};

export default DailyLivingPage;