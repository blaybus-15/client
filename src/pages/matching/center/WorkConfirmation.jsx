import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { workConfirmations } from '../../../data/caregiverProfile';
import CheckIcon from '../../../assets/check-icon.svg';

const InfoSection = ({ title, children }) => (
  <div className="p-4 bg-white">
    <h2 className="mb-4 text-base font-medium text-dark">{title}</h2>
    {children}
  </div>
);

const ContactItem = ({ label, phone }) => (
  <div className="mb-2">
    <div className="text-base text-gray-1">{label}</div>
    <div className="text-base font-medium text-dark">{phone}</div>
  </div>
);

const WorkConfirmation = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const confirmation = workConfirmations.find((w) => w.id === Number(id));

  if (!confirmation) {
    return <div>근무 정보를 찾을 수 없습니다.</div>;
  }

  const handleOnClick = () => {
    navigate('/matching/center');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* 상단 확정 안내 */}
      <div className="p-8 text-center bg-white">
        <div className="flex justify-center mb-4">
          <img
            src={CheckIcon}
            alt="체크 아이콘"
            className="mx-auto mt-12 mb-4 w-14 h-14 sm:mt-20"
          />
        </div>
        <h1 className="mb-2 text-xl font-semibold text-dark">근무 확정 안내</h1>
        <p className="text-base text-gray-600">
          {confirmation.contacts.caregiver.name} 보호사님의 근무가 확정
          되었습니다.
        </p>
      </div>

      {/* 근무 일정 */}
      <InfoSection title="출근 일정 및 장소">
        <div className="space-y-2">
          <div className="text-base font-medium text-dark">출근 일정</div>
          <div className="text-base text-dark">
            {confirmation.workSchedule.startDate} (월요일)
          </div>
          <div className="text-base text-dark">
            {confirmation.workSchedule.workingDays.join(', ')} (
            {confirmation.workSchedule.workingHours})
          </div>
          <div className="mt-4 text-base font-medium text-dark">주소</div>
          <div className="text-base text-dark">
            {confirmation.workSchedule.location.address}
          </div>
          <div className="text-base text-dark">
            {confirmation.workSchedule.location.detailAddress}
          </div>
        </div>
      </InfoSection>

      {/* 보호사 및 관리자 연락처 */}
      <div className="mt-2">
        <InfoSection title="보호사 및 관리자 연락처">
          <ContactItem
            label="요양보호사 연락처"
            phone={confirmation.contacts.caregiver.phone}
          />
          <ContactItem
            label="관리자 연락처"
            phone={confirmation.contacts.manager.phone}
          />
        </InfoSection>
      </div>

      {/* 어르신 연락처 */}
      <div className="mt-2">
        <InfoSection title="어르신 연락처">
          <ContactItem
            label="어르신 연락처"
            phone={confirmation.contacts.senior.phone}
          />
          <ContactItem
            label="보호자 연락처"
            phone={confirmation.contacts.guardian.phone}
          />
        </InfoSection>
      </div>

      {/* 입금 받으실 계좌 */}
      <div className="mt-2">
        <InfoSection title="입금 받으실 계좌">
          <div className="space-y-2">
            <div className="text-base text-dark">농협은행</div>
            <div className="text-base text-dark">
              {confirmation.payment.accountNumber}
            </div>
            <div className="text-base text-dark">
              예금주: {confirmation.payment.accountHolder}
            </div>
          </div>
        </InfoSection>
      </div>

      {/* 하단 확인 버튼 */}
      <div className="bottom-0 left-0 right-0 p-4 bg-white ">
        <button
          className="w-full py-4 text-base font-semibold text-dark bg-[#FFE943] rounded-lg"
          onClick={handleOnClick}
        >
          확인
        </button>
      </div>
    </div>
  );
};

export default WorkConfirmation;
