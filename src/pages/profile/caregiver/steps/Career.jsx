import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  nextStep,
  updateProfileData,
} from '../../../../redux/profile/caregiverProfileSlice';
import Button from '../../../../components/Button';
import SelectableCard from '../../../../components/SelectableCard';
import { BiSearch, BiPlus } from 'react-icons/bi';
import SearchBar from '../../../../components/SearchBar';
import LimitedTextInput from '../../../../components/LimitedTextField';

const Career = () => {
  const [hasCareer, setHasCareer] = useState(null);
  const [isCurrentlyEmployed, setIsCurrentlyEmployed] = useState(false);
  const [careerDetails, setCareerDetails] = useState({
    workplace: '',
    startDate: '',
    endDate: '',
    duties: '',
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSelect = (value) => {
    setHasCareer(value);
  };

  const handleNext = () => {
    if (hasCareer !== null) {
      dispatch(updateProfileData({ hasCareer, careerDetails }));
      dispatch(nextStep());
      navigate('/profile/caregiver/introduction');
    }
  };

  const handleCareerDetailsChange = (field, value) => {
    setCareerDetails((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const options = ['신입이에요', '경력있어요'];

  return (
    <>
      <div className="flex-1 px-4 pt-24">
        <div className="mb-[27px] head-semi-bold-24">
          선생님의 경력을
          <br />
          선택해주세요.
        </div>
        <div className="mb-3 text-dark body-medium-18">경력</div>
        <SelectableCard
          items={options}
          multiple={false}
          onSelect={handleSelect}
          selectedClassName="py-3 bg-background-point body-semi-bold-16 shadow-inner"
          unselectedClassName="py-3 bg-background-gray body-regular-16 hover:bg-gray-2/20"
        />

        {hasCareer === 1 && (
          <div className="p-4 mt-6 space-y-6 rounded-lg bg-background-gray">
            {/* TODO: 근무기관 검색 기능 수정 */}
            <SearchBar placeholder="근무 기관 검색하기" />

            {/* 해당 근무 기관 */}
            <div className="space-y-2">
              <label className="block">
                <span className="body-medium-18 text-dark">해당 근무 기관</span>
                <span className="text-[#FF5050]">*</span>
              </label>
              <input
                type="text"
                placeholder="근무했던 기관 이름을 작성해 주세요."
                className="w-full px-3 py-2.5 bg-white rounded-lg text-dark hover:shadow-inner  focus:outline-none"
                value={careerDetails.workplace}
                onChange={(e) =>
                  handleCareerDetailsChange('workplace', e.target.value)
                }
              />
            </div>

            {/* 근무 기간 */}
            <div className="space-y-2">
              <label className="block">
                <span className="body-medium-18 text-dark">근무 기간</span>
                <span className="text-[#FF5050]">*</span>
              </label>
              <div className="flex items-center gap-2">
                <div className="flex-1 space-y-1">
                  <div className="sub-regular-12 text-gray-1">시작기간</div>
                  <input
                    type="month"
                    className="w-full px-3 py-2.5 bg-white rounded-lg text-gray-600"
                    value={careerDetails.startDate}
                    onChange={(e) =>
                      handleCareerDetailsChange('startDate', e.target.value)
                    }
                  />
                </div>
                <div className="w-4 h-px mt-8 bg-zinc-200" />
                <div className="flex-1 space-y-1">
                  <div className="sub-regular-12 text-gray-1">종료기간</div>
                  {isCurrentlyEmployed ? (
                    <div className="w-full px-3 py-2.5 bg-white rounded-lg text-gray-600">
                      재직중
                    </div>
                  ) : (
                    <input
                      type="month"
                      className="w-full px-3 py-2.5 bg-white rounded-lg text-gray-600"
                      value={careerDetails.endDate}
                      onChange={(e) =>
                        handleCareerDetailsChange('endDate', e.target.value)
                      }
                    />
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <input
                  type="checkbox"
                  id="currentlyEmployed"
                  checked={isCurrentlyEmployed}
                  onChange={(e) => {
                    setIsCurrentlyEmployed(e.target.checked);
                    if (e.target.checked) {
                      handleCareerDetailsChange('endDate', '');
                    }
                  }}
                  className="w-5 h-5 rounded-full"
                />
                <label htmlFor="currentlyEmployed" className="text-gray-1">
                  재직중
                </label>
              </div>
            </div>

            {/* 담당 업무 */}
            <div className="space-y-2">
              <label className="block">
                <span className="body-medium-18 text-dark">담당 업무</span>
                <span className="text-[#FF5050]">*</span>
              </label>
              <LimitedTextInput
                value={careerDetails.duties}
                className="bg-white"
                onChange={(value) => handleCareerDetailsChange('duties', value)}
                placeholder="담당했던 업무를 작성해 주세요."
              />
            </div>

            {/* 경력 추가 버튼 */}
            <button className="w-full py-1.5 bg-yellow-300 rounded flex items-center justify-center gap-2">
              <BiPlus className="text-xl" />
              <span className="text-base font-semibold text-dark">
                경력 추가하기
              </span>
            </button>
            <p className="text-center sub-regular-12 text-gray-1">
              경력을 추가하고 저장을 눌러주세요.
            </p>
          </div>
        )}
      </div>

      <div className="p-4 pb-28 sm:pb-16 md:pb-12">
        <Button
          text={'다음'}
          onClick={handleNext}
          disabled={hasCareer === null}
        />
      </div>
    </>
  );
};

export default Career;
