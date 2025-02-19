import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CaregiverCard from '../../../components/matching/CaregiverCard';
import ConfirmModal from '../../../components/modal/ConfirmModal';
import ResultPage from './ResultPage';
import { caregiverProfiles } from '../../../data/caregiverProfile';

const CaregiverList = () => {
  const [caregivers, setCaregivers] = useState(caregiverProfiles);
  const [showResult, setShowResult] = useState(false);
  const [resultType, setResultType] = useState('');
  const navigate = useNavigate();

  // 모달 상태 관리
  const [modalConfig, setModalConfig] = useState({
    isOpen: false,
    message: '',
    subMessage: '',
    onConfirm: () => {},
    caregiverId: null,
  });

  // 요양보호사 클릭 핸들러
  const handleCaregiverClick = (caregiverId) => {
    navigate(`/caregivers/${caregiverId}`);
  };

  // 수락 핸들러
  const handleAccept = (caregiverId, event) => {
    event.stopPropagation();
    setModalConfig({
      isOpen: true,
      message: '매칭을 수락하시겠습니까?',
      subMessage: '수락하면 요양보호사님께 알림이 발송됩니다.',
      onConfirm: () => {
        setModalConfig({ ...modalConfig, isOpen: false });
        setShowResult(true);
        setResultType('accept');
      },
      caregiverId,
    });
  };

  // 거절 핸들러
  const handleReject = (caregiverId, event) => {
    event.stopPropagation();
    setModalConfig({
      isOpen: true,
      message: '매칭을 거절하시겠습니까?',
      subMessage: '거절하면 다른 요양보호사님을 찾아볼 수 있습니다.',
      onConfirm: () => {
        setModalConfig({ ...modalConfig, isOpen: false });
        setShowResult(true);
        setResultType('reject');
      },
      caregiverId,
    });
  };

  // 결과 페이지가 보여질 때
  if (showResult) {
    return <ResultPage type={resultType} />;
  }

  return (
    <div className="min-h-screen bg-background-gray">
      <div className="max-w-2xl mx-auto">
        <div className="px-4 pt-16 pb-8">
          <h1 className="head-semi-bold-24">요양보호사 목록</h1>
        </div>

        {/* 리스트 영역 */}
        <div className="pb-24">
          <div className="space-y-3">
            {caregivers.map((caregiver) => (
              <div
                key={caregiver.id}
                className="p-4 bg-white cursor-pointer"
                onClick={() => handleCaregiverClick(caregiver.id)}
              >
                <CaregiverCard
                  name={caregiver.basicInfo.name}
                  location={caregiver.basicInfo.address}
                  birthDate={caregiver.basicInfo.birthDate}
                  phone={caregiver.basicInfo.phone}
                  gender={caregiver.basicInfo.gender}
                  carDescription={caregiver.basicInfo.carOwnership}
                  educationStatus={caregiver.basicInfo.dementiaEducation}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 확인 모달 */}
      <ConfirmModal
        isOpen={modalConfig.isOpen}
        onClose={() => setModalConfig({ ...modalConfig, isOpen: false })}
        onConfirm={modalConfig.onConfirm}
        message={modalConfig.message}
        subMessage={modalConfig.subMessage}
      />
    </div>
  );
};

export default CaregiverList;
