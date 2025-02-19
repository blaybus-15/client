import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import InputField from '../../../../components/InputField';
import OptionButton from '../../../../components/OptionButton';
import Dropdown from '../../../../components/Dropdown';
import Button from '../../../../components/Button';
import { setSeniorInfo } from '../../../../redux/seniorSlice';
import Postcode from 'react-daum-postcode';

const BasicInfoPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [address, setAddress] = useState('');
  const [detailAddress, setDetailAddress] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    birthDate: { year: '', month: '', day: '' },
    genderType: '',
    careLevel: 'NO_GRADE',
    address: '',
    isCoLiving: '', // 문장형으로 작성
    contactInfo: '',
    guardianContact: '',
  });

  const careLevels = [
    'NO_GRADE',
    'LEVEL_1',
    'LEVEL_2',
    'LEVEL_3',
    'LEVEL_4',
    'LEVEL_5',
    'COGNITIVE_SUPPORT',
  ];

  const genderOptions = [
    { label: '남자', value: 'MALE' },
    { label: '여자', value: 'FEMALE' },
  ];

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleBirthDateChange = (part, value) => {
    setFormData((prev) => ({
      ...prev,
      birthDate: { ...prev.birthDate, [part]: value },
    }));
  };

  const handleComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress +=
          extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }

    setFormData((prev) => ({ ...prev, address: fullAddress }));
    dispatch(setSeniorInfo({ address: fullAddress }));
    setIsPopupOpen(false);
  };

  const isFormValid = () => {
    const { year, month, day } = formData.birthDate;
    return (
      formData.name &&
      year.length === 4 &&
      month.length === 2 &&
      day.length === 2 &&
      formData.genderType &&
      formData.careLevel &&
      formData.address &&
      formData.contactInfo &&
      formData.guardianContact
    );
  };

  const handleNext = () => {
    const { year, month, day } = formData.birthDate;

    if (!isFormValid()) {
      alert('필수 입력 사항을 정확하게 입력해주세요.');
      return;
    }

    const formattedData = {
      ...formData,
      birthDate: `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`, // "YYYY-MM-DD" 형식 변환
    };

    dispatch(setSeniorInfo(formattedData));
    navigate('/profile/senior/gender-select');
  };

  return (
    <div className="flex flex-col justify-evenly min-h-screen px-6 py-12 bg-white">
      <div className="mt-9 mb-7 head-semi-bold-24">
        어르신의 기본 정보를
        <br />
        입력해주세요.
      </div>

      <div className="gap-4 flex flex-col">
        <InputField
          label="이름"
          placeholder="입력해주세요."
          type="text"
          value={formData.name}
          onChange={(e) => handleChange('name', e.target.value)}
          required
        />

        {/* 생년월일 입력 */}
        <div className="flex flex-col">
          <label className="body-medium-18 mb-3">생년월일</label>
          <div className="flex space-x-2">
            <input
              type="text"
              placeholder="YYYY"
              className="w-full px-4 py-4 body-regular-16 text-dark bg-background-gray placeholder-gray-3
                  rounded-xl focus:outline-none"
              value={formData.birthDate.year}
              onChange={(e) => handleBirthDateChange('year', e.target.value)}
            />
            <input
              type="text"
              placeholder="MM"
              className="w-full px-4 py-4 body-regular-16 text-dark bg-background-gray placeholder-gray-3
                  rounded-xl focus:outline-none"
              value={formData.birthDate.month}
              onChange={(e) => handleBirthDateChange('month', e.target.value)}
            />
            <input
              type="text"
              placeholder="DD"
              className="w-full px-4 py-4 body-regular-16 text-dark bg-background-gray placeholder-gray-3
                  rounded-xl focus:outline-none"
              value={formData.birthDate.day}
              onChange={(e) => handleBirthDateChange('day', e.target.value)}
            />
          </div>
        </div>

        <OptionButton
          label="성별"
          options={[
            { label: '남자', value: 'MALE' },
            { label: '여자', value: 'FEMALE' },
          ]}
          selectedOption={formData.genderType || ''}
          onSelect={(value) => handleChange('genderType', value)}
        />

        <Dropdown
          label="장기요양등급"
          title="입력해 주세요"
          items={careLevels}
          onSelect={(value) => handleChange('careLevel', value)}
          style="bg-background-gray"
        />

        <div className="">
          <div className="w-full mx-auto mb-3">
            <p className="text-lg font-medium text-dark mb-3">주소</p>
            <div className="relative rounded-lg bg-background-gray body-regular-16">
              <input
                type="text"
                value={formData.address}
                readOnly
                placeholder="도로명으로 검색하세요."
                className="w-full h-12 p-4 pr-24 bg-transparent outline-none placeholder-gray-3 text-dark"
                onClick={() => setIsPopupOpen(true)}
              />
              <button
                onClick={() => setIsPopupOpen(true)}
                className="absolute px-4 py-2 text-white -translate-y-1/2 rounded-lg bg-gray-2 right-2 top-1/2 hover:bg-main hover:text-dark"
              >
                검색
              </button>
            </div>
          </div>

          <InputField
            placeholder="상세주소를 입력해 주세요."
            type="text"
            value={detailAddress}
            onChange={(e) => setDetailAddress(e.target.value)}
          />
        </div>

        <div>
          <InputField
            label="동거 여부"
            placeholder="입력해 주세요"
            type="text"
            value={formData.isCoLiving}
            onChange={(e) => handleChange('isCoLiving', e.target.value)}
          />
          <p className="caption-regular-14 text-gray-3 mt-1">
            어르신이 현재 보호자와 동거중인지, 돌봄 서비스를
            <br />
            이용할 때 함께 있는지 문장형으로 작성해 주세요.
          </p>
        </div>

        <InputField
          label="어르신 연락처"
          placeholder="입력해 주세요"
          type="tel"
          value={formData.contactInfo}
          onChange={(e) => handleChange('contactInfo', e.target.value)}
          required
        />

        <InputField
          label="보호자 연락처"
          placeholder="입력해 주세요"
          type="tel"
          value={formData.guardianContact}
          onChange={(e) => handleChange('guardianContact', e.target.value)}
          required
        />

        {isPopupOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="w-full max-w-lg p-4 bg-white rounded-lg shadow-lg">
              <div className="flex justify-between mb-2">
                <h2 className="text-lg font-semibold">주소 검색</h2>
                <button
                  onClick={() => setIsPopupOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  닫기
                </button>
              </div>
              <Postcode
                onComplete={handleComplete}
                style={{ height: '450px' }}
              />
            </div>
          </div>
        )}

        <div className="mt-5">
          <Button text="다음" onClick={handleNext} disabled={!isFormValid()} />
        </div>
      </div>
    </div>
  );
};

export default BasicInfoPage;
