import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSeniorInfo } from '../../../../redux/seniorSlice';
import SelectableCard from '../../../../components/SelectableCard';
import Button from '../../../../components/Button';

const RequiredServicePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { requiredServices } = useSelector((state) => state.senior);

  const handleSelect = (selectedIndexes) => {
    const serviceKeys = [
      'MEAL_PREPARATION', 'MEAL_SETUP', 'SOFT_FOOD_SUPERVISION', 'TOILETING_ASSISTANCE', 
      'BED_CARE', 'CATHETER_CARE', 'WASHING_ASSISTANCE', 'MOBILITY_SUPPORT', 
      'CLEANING_SUPPORT', 'BATHING_ASSISTANCE', 'HOSPITAL_VISIT_ASSISTANCE', 
      'EXERCISE_SUPPORT', 'MENTAL_SUPPORT', 'COGNITIVE_ACTIVITY_SUPPORT', 
      'PERSONAL_ACTIVITY_SUPPORT'
    ];
    dispatch(setSeniorInfo({ requiredServices: selectedIndexes.map(index => serviceKeys[index]) }));
  };

  const isButtonDisabled = requiredServices.length === 0;

  return (
    <div className="flex flex-col justify-between min-h-screen px-6 pt-12 bg-white">
      <div className="flex-1 px-4">
        <div className="mt-9 mb-8 head-semi-bold-24">
          어르신의 필요 서비스를
          <br />
          입력해 주세요.
        </div>

        {/* 필요 서비스 선택 */}
        <div className="mb-6">
          <div className="text-dark body-medium-18 mb-3">필요 서비스 선택 (복수 선택 가능)</div>
          <SelectableCard
            items={[
              '식사조리', '식사 준비 및 정리', '경관식 보조', '대소변 실수 시 도움', '기저귀 케어', 
              '유치도뇨/방광루/장루', '세면 도움', '부축 도움', '청소 및 빨래 보조', '목욕 보조', 
              '병원 동행', '운동 보조', '정서 지원', '인지활동 보조', '개인활동 보조'
            ]}
            multiple
            onSelect={handleSelect}
            className="grid-cols-2 md:grid-cols-4"
          />
        </div>
      </div>

      {/* 다음 버튼 */}
      <div className="p-4">
        <Button text="다음" onClick={() => navigate('/profile/senior/match-salary')} disabled={isButtonDisabled} />
      </div>
    </div>
  );
};

export default RequiredServicePage;