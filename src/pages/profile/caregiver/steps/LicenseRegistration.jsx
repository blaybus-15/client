import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  nextStep,
  updateProfileData,
} from '../../../../redux/profile/caregiverProfileSlice';
import CheckCard from '../../../../components/CheckCard';
import Button from '../../../../components/Button';
import InputFieldWithButton from '../../../../components/InputFieldWithButton';
import Dropdown from '../../../../components/Dropdown';
import { LuCamera } from 'react-icons/lu';
import { AiOutlinePlus } from 'react-icons/ai';

const LicenseRegistration = () => {
  const [hasLicense, setHasLicense] = useState(null);
  const [licenseNumber, setLicenseNumber] = useState('');
  const [additionalLicenseType, setAdditionalLicenseType] = useState('');
  const [additionalLicenseNumber, setAdditionalLicenseNumber] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSelect = (value) => {
    setHasLicense(value);
  };

  const handleLicenseNumberChange = (e) => {
    setLicenseNumber(e.target.value);
  };

  const handleAdditionalLicenseNumberChange = (e) => {
    setAdditionalLicenseNumber(e.target.value);
  };

  const handleNext = () => {
    if (hasLicense !== null) {
      dispatch(
        updateProfileData({
          hasLicense,
          licenseNumber: hasLicense ? licenseNumber : null,
          additionalLicenses:
            hasLicense && additionalLicenseType
              ? [
                  {
                    type: additionalLicenseType,
                    number: additionalLicenseNumber,
                  },
                ]
              : [],
        })
      );
      dispatch(nextStep());
      navigate('/profile/caregiver/dementia-education');
    }
  };

  const options = [
    { id: 'yes', label: '예, 취득했어요.', value: true },
    { id: 'no', label: '아니요, 아직 없어요.', value: false },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1 px-4 pt-20">
        <div className="mb-16 text-2xl font-semibold">
          요양보호사 자격증이
          <br />
          있으신가요?
        </div>

        <CheckCard
          value={hasLicense}
          onChange={(value) => handleSelect(value)}
          yesLabel={options[0].label}
          noLabel={options[1].label}
        />

        {hasLicense && (
          <div className="mt-8">
            <div className="mb-6">
              <div className="pl-3.5 pr-2.5 py-2.5">
                <span className="body-semi-bold-18">
                  요양보호사 자격증 추가{' '}
                </span>
                <span className="font-semibold text-[#FF5050]">*</span>
              </div>

              <div className="p-3.5 bg-background-gray rounded-lg">
                <div className="mb-4">
                  <div className="mb-3 text-dark body-medium-18">
                    요양보호사 자격증 번호 입력
                  </div>
                  <InputFieldWithButton
                    style="bg-white"
                    placeholder="번호를 입력해주세요."
                    value={licenseNumber}
                    onChange={handleLicenseNumberChange}
                  />
                </div>

                <div>
                  <div className="mb-3 body-medium-18 text-dark">
                    자격증 이미지로 추가하기
                  </div>
                  <div className="inline-flex flex-col items-center px-6 pt-4 pb-3 bg-white rounded-lg">
                    <LuCamera size={24} className="text-gray-2" />
                    <div className="mt-1 text-sm text-center text-gray-400">
                      이미지
                      <br />
                      추가하기
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="pl-3.5 pr-2.5 py-2.5 flex justify-between items-center">
                <div className="body-semi-bold-18">보유 자격증 추가</div>
                <button className="text-gray-2">
                  <AiOutlinePlus size={24} />
                </button>
              </div>

              <div className="p-3.5 bg-zinc-100 rounded-lg">
                <div className="mb-4">
                  <div className="mb-3 body-medium-18 text-dark">
                    보유 자격증 종류 선택
                  </div>

                  <div className="relative z-50">
                    <Dropdown
                      items={['사회복지사', '간호조무사']}
                      title={'선택해 주세요.'}
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <div className="mb-3 body-medium-18 text-dark">
                    자격증 번호 입력
                  </div>
                  <InputFieldWithButton
                    style="bg-white"
                    placeholder="번호를 입력해주세요."
                    value={additionalLicenseNumber}
                    onChange={handleAdditionalLicenseNumberChange}
                  />
                </div>

                <div>
                  <div className="mb-3 text-lg font-medium">
                    자격증 이미지로 추가하기
                  </div>
                  <div className="inline-flex flex-col items-center px-6 pt-4 pb-3 bg-white rounded-lg">
                    <LuCamera size={24} className="text-gray-2" />
                    <div className="mt-1 text-sm text-center text-gray-400">
                      이미지
                      <br />
                      추가하기
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 pb-28 sm:pb-16 md:pb-12">
        <Button
          text="다음"
          onClick={handleNext}
          disabled={hasLicense === null || (hasLicense && !licenseNumber)}
        />
      </div>
    </div>
  );
};

export default LicenseRegistration;
