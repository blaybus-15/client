import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  nextStep,
  updateProfileData,
} from '../../../../redux/profile/caregiverProfileSlice';
import Button from '../../../../components/Button';
import SelectableCard from '../../../../components/SelectableCard';
import { BiPlus } from 'react-icons/bi';
import SearchBar from '../../../../components/SearchBar';
import LimitedTextInput from '../../../../components/LimitedTextField';
import CareerCard from '../../../../components/CareerCard';
import { BsCheck } from 'react-icons/bs';

const StyledCheckbox = ({ id, checked, onChange, label, className = '' }) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <button
        onClick={() => onChange(!checked)}
        className="relative flex items-center justify-center"
      >
        <span
          className={`rounded-full p-1 ${checked ? 'bg-main' : 'bg-gray-2'}`}
        >
          <BsCheck size={14} className={checked ? 'text-dark' : 'text-white'} />
        </span>
      </button>
      <label htmlFor={id} className="cursor-pointer text-gray-1">
        {label}
      </label>
    </div>
  );
};
const Career = () => {
  const [hasCareer, setHasCareer] = useState(null);
  const [isShowingForm, setIsShowingForm] = useState(false);
  const [careers, setCareers] = useState([]);
  const [currentCareer, setCurrentCareer] = useState({
    workplace: '',
    startDate: '',
    endDate: '',
    duties: '',
    isCurrentlyEmployed: false,
  });
  const [editingIndex, setEditingIndex] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSelect = (value) => {
    setHasCareer(value);
    if (value === 1 && careers.length === 0) {
      setIsShowingForm(true);
    }
  };

  const handleNext = () => {
    if (hasCareer !== null) {
      dispatch(updateProfileData({ hasCareer, careers }));
      dispatch(nextStep());
      navigate('/profile/caregiver/introduction');
    }
  };

  const handleCareerDetailsChange = (field, value) => {
    setCurrentCareer((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSaveCareer = () => {
    if (editingIndex !== null) {
      // Update existing career
      setCareers(
        careers.map((career, index) =>
          index === editingIndex ? currentCareer : career
        )
      );
      setEditingIndex(null);
    } else {
      // Add new career
      setCareers([...careers, currentCareer]);
    }

    // Reset form
    setCurrentCareer({
      workplace: '',
      startDate: '',
      endDate: '',
      duties: '',
      isCurrentlyEmployed: false,
    });
    setIsShowingForm(false);
  };

  const handleEdit = (career, index) => {
    setCurrentCareer(career);
    setEditingIndex(index);
    setIsShowingForm(true);
  };

  const handleDelete = (index) => {
    setCareers(careers.filter((_, i) => i !== index));
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
      </div>
      {hasCareer === 1 && (
        <div className="px-4 pt-3 mt-12 bg-background-gray">
          <div className="space-y-6">
            <SearchBar placeholder="근무 기관 검색하기" />

            {/* Career Cards */}
            {careers.map((career, index) => (
              <CareerCard
                key={index}
                career={career}
                onEdit={() => handleEdit(career, index)}
                onDelete={() => handleDelete(index)}
              />
            ))}

            {!isShowingForm && (
              <button
                onClick={() => setIsShowingForm(true)}
                className="w-full py-1.5 mt-4 bg-main rounded flex items-center justify-center gap-2"
              >
                <BiPlus className="text-xl" />
                <span className="text-base font-semibold text-dark">
                  경력 추가하기
                </span>
              </button>
            )}
          </div>

          {isShowingForm && (
            <div className="mt-6 space-y-6 rounded-lg bg-background-gray">
              {/* Career Form Fields */}
              <div className="space-y-2">
                <label className="block">
                  <span className="body-medium-18 text-dark">
                    해당 근무 기관
                  </span>
                  <span className="text-[#FF5050]">*</span>
                </label>
                <input
                  type="text"
                  placeholder="근무했던 기관 이름을 작성해 주세요."
                  className="w-full px-3 py-2.5 bg-white rounded-lg text-dark hover:shadow-inner focus:outline-none"
                  value={currentCareer.workplace}
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
                      type="date"
                      className="w-full h-11 px-3 py-2.5 bg-white rounded-lg text-gray-600"
                      value={currentCareer.startDate}
                      onChange={(e) =>
                        handleCareerDetailsChange('startDate', e.target.value)
                      }
                    />
                  </div>
                  <div className="w-4 h-px mt-8 bg-zinc-200" />
                  <div className="flex-1 space-y-1">
                    <div className="sub-regular-12 text-gray-1">종료기간</div>
                    {currentCareer.isCurrentlyEmployed ? (
                      <div className="h-11 px-3 py-2.5 bg-white rounded-lg text-gray-600">
                        재직중
                      </div>
                    ) : (
                      <input
                        type="date"
                        className="w-full h-11 px-3 py-2.5 bg-white rounded-lg text-gray-600"
                        value={currentCareer.endDate}
                        onChange={(e) =>
                          handleCareerDetailsChange('endDate', e.target.value)
                        }
                      />
                    )}
                  </div>
                </div>
                <StyledCheckbox
                  id="currentlyEmployed"
                  checked={currentCareer.isCurrentlyEmployed}
                  onChange={(checked) => {
                    handleCareerDetailsChange('isCurrentlyEmployed', checked);
                    if (checked) {
                      handleCareerDetailsChange('endDate', '');
                    }
                  }}
                  label="재직중"
                  className="mt-2"
                />
              </div>

              {/* 담당 업무 */}
              <div className="space-y-2">
                <label className="block">
                  <span className="body-medium-18 text-dark">담당 업무</span>
                  <span className="text-[#FF5050]">*</span>
                </label>
                <LimitedTextInput
                  value={currentCareer.duties}
                  className="bg-white"
                  onChange={(value) =>
                    handleCareerDetailsChange('duties', value)
                  }
                  placeholder="담당했던 업무를 작성해 주세요."
                />
              </div>

              {/* Save Button */}
              <button
                onClick={handleSaveCareer}
                className="w-full py-1.5 bg-yellow-300 rounded flex items-center justify-center gap-2"
              >
                <span className="text-base font-semibold text-dark">저장</span>
              </button>
              <p className="text-center sub-regular-12 text-gray-1">
                경력을 추가하고 저장을 눌러주세요.
              </p>
            </div>
          )}
        </div>
      )}

      <div
        className={`p-4 pb-28 sm:pb-16 md:pb-12 ${
          hasCareer === 1 ? 'bg-background-gray' : 'bg-white'
        }`}
      >
        <Button
          text={'다음'}
          onClick={handleNext}
          disabled={
            hasCareer === null || (hasCareer === 1 && careers.length === 0)
          }
        />
      </div>
    </>
  );
};

export default Career;
