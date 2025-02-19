import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CaregiverCard from '../../../components/matching/CaregiverCard';
import ConfirmModal from '../../../components/modal/ConfirmModal';
import ResultPage from './ResultPage';
import { caregiverProfiles } from '../../../data/caregiverProfile';
import SearchBar from '../../../components/SearchBar';
import Dropdown from '../../../components/Dropdown';

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
          {/* <h1 className="head-semi-bold-24">요양보호사 목록</h1> */}
          <SearchBar placeholder={'조건을 입력해 주세요.'} />
          {/* 피그마 */}
          <div className="flex flex-row pt-2 space-x-4 overflow-x-auto">
            <div className="h-7 px-2.5 bg-white rounded border border-sky-400 flex items-center gap-1 shrink-0">
              <div className="text-sky-600 text-sm font-normal font-['Pretendard'] leading-tight whitespace-nowrap">
                확정대기
              </div>
              <div className="relative">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M10.4722 12.4722C10.3472 12.5972 10.1777 12.6674 10.0009 12.6674C9.8241 12.6674 9.65456 12.5972 9.52955 12.4722L5.75821 8.70088C5.69454 8.63938 5.64375 8.56582 5.60881 8.48448C5.57387 8.40315 5.55548 8.31567 5.55471 8.22715C5.55394 8.13863 5.57081 8.05084 5.60433 7.96891C5.63785 7.88698 5.68735 7.81254 5.74995 7.74995C5.81254 7.68735 5.88698 7.63785 5.96891 7.60433C6.05084 7.57081 6.13863 7.55394 6.22715 7.55471C6.31567 7.55548 6.40315 7.57387 6.48448 7.60881C6.56582 7.64375 6.63938 7.69454 6.70088 7.75821L10.0009 11.0582L13.3009 7.75821C13.4266 7.63677 13.595 7.56958 13.7698 7.5711C13.9446 7.57262 14.1118 7.64273 14.2354 7.76633C14.359 7.88994 14.4291 8.05715 14.4307 8.23195C14.4322 8.40674 14.365 8.57515 14.2435 8.70088L10.4722 12.4722Z"
                    fill="#0081D1"
                  />
                </svg>
              </div>
            </div>

            <div className="h-7 px-2.5 bg-white rounded flex items-center gap-1 shrink-0">
              <div className="text-stone-900 text-sm font-normal font-['Pretendard'] leading-tight whitespace-nowrap">
                주 1회
              </div>
              <div className="relative">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M10.4722 12.4722C10.3472 12.5972 10.1777 12.6674 10.0009 12.6674C9.8241 12.6674 9.65456 12.5972 9.52955 12.4722L5.75821 8.70088C5.69454 8.63938 5.64375 8.56582 5.60881 8.48448C5.57387 8.40315 5.55548 8.31567 5.55471 8.22715C5.55394 8.13863 5.57081 8.05084 5.60433 7.96891C5.63785 7.88698 5.68735 7.81254 5.74995 7.74995C5.81254 7.68735 5.88698 7.63785 5.96891 7.60433C6.05084 7.57081 6.13863 7.55394 6.22715 7.55471C6.31567 7.55548 6.40315 7.57387 6.48448 7.60881C6.56582 7.64375 6.63938 7.69454 6.70088 7.75821L10.0009 11.0582L13.3009 7.75821C13.4266 7.63677 13.595 7.56958 13.7698 7.5711C13.9446 7.57262 14.1118 7.64273 14.2354 7.76633C14.359 7.88994 14.4291 8.05715 14.4307 8.23195C14.4322 8.40674 14.365 8.57515 14.2435 8.70088L10.4722 12.4722Z"
                    fill="#606265"
                  />
                </svg>
              </div>
            </div>

            <div className="h-7 px-2.5 bg-white rounded flex items-center gap-1 shrink-0">
              <div className="text-stone-900 text-sm font-normal font-['Pretendard'] leading-tight whitespace-nowrap">
                근무기간
              </div>
              <div className="relative">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M10.4722 12.4722C10.3472 12.5972 10.1777 12.6674 10.0009 12.6674C9.8241 12.6674 9.65456 12.5972 9.52955 12.4722L5.75821 8.70088C5.69454 8.63938 5.64375 8.56582 5.60881 8.48448C5.57387 8.40315 5.55548 8.31567 5.55471 8.22715C5.55394 8.13863 5.57081 8.05084 5.60433 7.96891C5.63785 7.88698 5.68735 7.81254 5.74995 7.74995C5.81254 7.68735 5.88698 7.63785 5.96891 7.60433C6.05084 7.57081 6.13863 7.55394 6.22715 7.55471C6.31567 7.55548 6.40315 7.57387 6.48448 7.60881C6.56582 7.64375 6.63938 7.69454 6.70088 7.75821L10.0009 11.0582L13.3009 7.75821C13.4266 7.63677 13.595 7.56958 13.7698 7.5711C13.9446 7.57262 14.1118 7.64273 14.2354 7.76633C14.359 7.88994 14.4291 8.05715 14.4307 8.23195C14.4322 8.40674 14.365 8.57515 14.2435 8.70088L10.4722 12.4722Z"
                    fill="#606265"
                  />
                </svg>
              </div>
            </div>

            <div className="h-7 px-2.5 bg-white rounded flex items-center gap-1 shrink-0">
              <div className="text-stone-900 text-sm font-normal font-['Pretendard'] leading-tight whitespace-nowrap">
                근무시간
              </div>
              <div className="relative">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M10.4722 12.4722C10.3472 12.5972 10.1777 12.6674 10.0009 12.6674C9.8241 12.6674 9.65456 12.5972 9.52955 12.4722L5.75821 8.70088C5.69454 8.63938 5.64375 8.56582 5.60881 8.48448C5.57387 8.40315 5.55548 8.31567 5.55471 8.22715C5.55394 8.13863 5.57081 8.05084 5.60433 7.96891C5.63785 7.88698 5.68735 7.81254 5.74995 7.74995C5.81254 7.68735 5.88698 7.63785 5.96891 7.60433C6.05084 7.57081 6.13863 7.55394 6.22715 7.55471C6.31567 7.55548 6.40315 7.57387 6.48448 7.60881C6.56582 7.64375 6.63938 7.69454 6.70088 7.75821L10.0009 11.0582L13.3009 7.75821C13.4266 7.63677 13.595 7.56958 13.7698 7.5711C13.9446 7.57262 14.1118 7.64273 14.2354 7.76633C14.359 7.88994 14.4291 8.05715 14.4307 8.23195C14.4322 8.40674 14.365 8.57515 14.2435 8.70088L10.4722 12.4722Z"
                    fill="#606265"
                  />
                </svg>
              </div>
            </div>
          </div>
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
