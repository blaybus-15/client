import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { caregiverProfiles } from '../../../data/caregiverProfile';
import { RiEditLine } from 'react-icons/ri';
import ConfirmModal from '../../../components/modal/ConfirmModal';
import ResultPage from './ResultPage';
import RejectReason from './RejectReason';
import defaultCaregiverProfile from '../../../assets/caregiver-profile.png';

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
  <div className="flex items-center gap-4">
    <span className="w-24 font-medium">{label}</span>
    <span className="text-left md:pl-4">{value}</span>
  </div>
);

const CaregiverProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
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
      message: `${caregiver.basicInfo.name} 보호사님의 근무를\n취소하시겠습니까 ?`,
      subMessage: '취소 시 보호사님께 안내문자가\n발송됩니다.',
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
      message: `${caregiver.basicInfo.name} 보호사님의 근무를\n확정하시겠습니까 ?`,
      subMessage: '근무 확정 시 보호사님께\n안내 문자가 발송됩니다.',
      onConfirm: () => {
        setIsModalOpen(false);
        navigate(`/caregivers/${id}/work-confirmation`);
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
    <div className="min-h-screen pb-20 bg-background-gray gap-y-1">
      {/* 헤더 */}
      <div className="flex items-center justify-between p-4 bg-white">
        <h1 className="text-lg font-semibold">보호사 프로필</h1>
      </div>

      {/* 프로필 정보 */}
      <div className="">
        <div className="bg-white">
          <div className="flex items-center px-4 pt-4 mb-6">
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-semibold text-[#0081D1]">
                {caregiver.basicInfo.name}{' '}
                <span className="text-black">보호사님</span>
              </h2>
              <RiEditLine className="w-5 h-5 text-gray-400" />
            </div>
          </div>

          <div className="flex items-center gap-6 p-4 mb-8">
            <div className="w-24 h-24 overflow-hidden rounded-full">
              <img
                src={defaultCaregiverProfile}
                alt="프로필"
                className="object-cover w-full h-full"
              />
            </div>
            <div className="flex-1 space-y-2 sm:pl-6">
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
        </div>

        {/* 소개 */}
        <section className="p-4 mb-8 bg-white">
          <SectionTitle title="소개" />
          <p className="body-regular-16 text-dark">
            {caregiver.basicInfo.addressDetail}
          </p>
        </section>

        {/* 한줄소개 */}
        <section className="p-4 mb-8 bg-white">
          <SectionTitle title="한줄소개" />
          <p className="body-regular-16 text-dark">
            {caregiver.introduction.description}
          </p>
        </section>

        {/* 성격 */}
        <section className="p-4 mb-8 bg-white">
          <SectionTitle title="성격" />
          <p className="mb-4 text-dark">{caregiver.introduction.title}</p>
        </section>

        {/* 성격 태그 */}
        <section className="p-4 mb-8 bg-white">
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
