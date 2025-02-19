import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import jobPostings from '../../../data/jobDetails';
import SeniorMatchingStatusCard from '../../../components/matching/SeniorMatchingStatusCard';
import SearchBar from '../../../components/SearchBar';

const SeniorMatchingStatus = () => {
  // Object.values() 대신 Object.entries()를 사용하여 [id, data] 형태로 변환
  const [seniors] = useState(
    Object.entries(jobPostings).map(([id, data]) => ({
      ...data,
      id, // id 값을 보존
    }))
  );
  const navigate = useNavigate();

  const handleSeniorClick = (id) => {
    navigate(`/matching/senior/${id}`);
  };

  return (
    <div className="min-h-screen bg-background-gray">
      <div className="max-w-2xl mx-auto">
        <div className="px-4 pt-16 pb-8">
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

        <div className="pb-24">
          <div className="space-y-3">
            {seniors.map((senior) => (
              <div
                key={senior.id}
                className="p-4 bg-white cursor-pointer"
                onClick={() => handleSeniorClick(senior.id)}
              >
                <SeniorMatchingStatusCard
                  name={senior.seniorInfo.name}
                  birthDate={senior.seniorInfo.birthDate}
                  gender={senior.seniorInfo.gender}
                  address={senior.workArea.address}
                  grade={senior.seniorInfo.grade}
                  status={senior.basicInfo.status}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeniorMatchingStatus;
