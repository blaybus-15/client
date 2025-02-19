import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { caregiverProfiles } from '../../../data/caregiverProfile';
import { RiEditLine } from 'react-icons/ri';
import ConfirmModal from '../../../components/modal/ConfirmModal';
import ResultPage from './ResultPage';
import RejectReason from './RejectReason';

const ProfileTag = ({ text, onDelete }) => (
  <span className="inline-flex items-center px-3 py-1.5 bg-[#FFF9D7] rounded-full text-dark">
    {text}
    {onDelete && (
      <button onClick={onDelete} className="ml-1">
        ×
      </button>
    )}
  </span>
);

const SectionTitle = ({ title }) => (
  <div className="flex items-center gap-2 mb-4">
    <h2 className="text-xl font-semibold text-dark">{title}</h2>
    <RiEditLine className="w-4 h-4 text-gray-400" />
  </div>
);

const DetailItem = ({ label, value }) => (
  <div className="flex justify-between py-1">
    <span className="text-gray-600">{label}</span>
    <span className="font-medium text-dark">{value}</span>
  </div>
);

const CaregiverProfile = () => {
  const { id } = useParams();
  const [currentView, setCurrentView] = useState('profile'); // 'profile' | 'rejectReason' | 'result'
  const [resultType, setResultType] = useState(''); // 'accept' | 'reject'
  const caregiver = caregiverProfiles.find((c) => c.id === Number(id));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalConfig, setModalConfig] = useState({
    message: '',
    subMessage: '',
    onConfirm: () => {},
  });

  // 모달 닫기 핸들러
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // 거절 버튼 핸들러
  const handleReject = () => {
    setModalConfig({
      message: '매칭을 거절하시겠습니까?',
      subMessage: '거절 시 해당 매칭은 취소됩니다.',
      onConfirm: () => {
        setIsModalOpen(false);
        setCurrentView('rejectReason');
      },
    });
    setIsModalOpen(true);
  };

  // 수락 버튼 핸들러
  const handleAccept = () => {
    setModalConfig({
      message: '매칭을 수락하시겠습니까?',
      subMessage: '수락 시 해당 매칭이 확정됩니다.',
      onConfirm: () => {
        setIsModalOpen(false);
        setResultType('accept');
        setCurrentView('result');
      },
    });
    setIsModalOpen(true);
  };

  // 거절 사유 제출 핸들러
  const handleRejectReasonSubmit = () => {
    setResultType('reject');
    setCurrentView('result');
  };

  // 현재 상태에 따라 적절한 컴포넌트 렌더링
  if (currentView === 'rejectReason') {
    return <RejectReason onSubmit={handleRejectReasonSubmit} />;
  }

  if (currentView === 'result') {
    return <ResultPage type={resultType} />;
  }

  if (!caregiver) {
    return <div>요양보호사를 찾을 수 없습니다.</div>;
  }

  return (
    <div className="min-h-screen pb-20 bg-white">
      {/* 헤더 */}
      <div className="flex items-center justify-between p-4 border-b">
        <h1 className="text-lg font-semibold">보호사 프로필</h1>
      </div>

      {/* 프로필 정보 */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-semibold text-[#0081D1]">
              {caregiver.basicInfo.name} 보호사님
            </h2>
            <RiEditLine className="w-5 h-5 text-gray-400" />
          </div>
        </div>

        <div className="flex items-center gap-6 mb-8">
          <div className="w-24 h-24 overflow-hidden rounded-full">
            <img
              src={caregiver.basicInfo.profileImage}
              alt="프로필"
              className="object-cover w-full h-full"
            />
          </div>
          <div className="flex-1 space-y-2">
            <DetailItem
              label="생년월일"
              value={caregiver.basicInfo.birthDate}
            />
            <DetailItem label="연락처" value={caregiver.basicInfo.phone} />
            <DetailItem label="성별" value={caregiver.basicInfo.gender} />
            <DetailItem label="나이" value={caregiver.basicInfo.age} />
            <DetailItem
              label="차량 소지"
              value={caregiver.basicInfo.carOwnership}
            />
            <DetailItem
              label="치매 교육"
              value={caregiver.basicInfo.dementiaEducation}
            />
          </div>
        </div>

        {/* 소개 */}
        <section className="mb-8">
          <SectionTitle title="소개" />
          <p className="mb-4 text-dark">{caregiver.basicInfo.addressDetail}</p>
        </section>

        {/* 한줄소개 */}
        <section className="mb-8">
          <SectionTitle title="한줄소개" />
          <p className="p-4 rounded-lg bg-gray-50 text-dark">
            {caregiver.introduction.description}
          </p>
        </section>

        {/* 성격 */}
        <section className="mb-8">
          <SectionTitle title="성격" />
          <p className="mb-4 text-dark">{caregiver.introduction.title}</p>
        </section>

        {/* 성격 태그 */}
        <section>
          <SectionTitle title="성격" />
          <div className="flex flex-wrap gap-2">
            {caregiver.introduction.keywords.map((keyword, index) => (
              <ProfileTag key={index} text={keyword} />
            ))}
          </div>
        </section>
      </div>

      {/* 거절/수락 버튼 */}
      <div className="bottom-0 left-0 right-0 p-4 bg-white ">
        <div className="grid max-w-2xl grid-cols-2 mx-auto gap-x-4">
          <button
            onClick={handleReject}
            className="px-4 py-3 body-semi-bold-16 text-[#0081D1] bg-white rounded-lg shadow-innerblue"
          >
            거절
          </button>
          <button
            onClick={handleAccept}
            className="px-4 py-3 rounded-lg body-semi-bold-16 text-dark bg-main"
          >
            수락
          </button>
        </div>
      </div>

      {/* Confirm Modal */}
      <ConfirmModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={modalConfig.onConfirm}
        message={modalConfig.message}
        subMessage={modalConfig.subMessage}
      />
    </div>
  );
};

export default CaregiverProfile;
