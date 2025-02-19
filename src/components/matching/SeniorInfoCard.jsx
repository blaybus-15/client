import React from 'react';

const SeniorInfoCard = ({
  age = '70세',
  gender = '여성',
  grade = '4등급',
  condition = '정상 (치매 증상 없음)',
  livingWith = '다른 가족과 동거하고 있으나 서비스 시간에는 자리 비움',
  specialNotes = '없음',
}) => {
  return (
    <div className="relative w-full bg-white">
      <div>
        <h2 className="pr-8 text-dark body-semi-bold-18">어르신 정보</h2>

        <div className="pt-3">
          <dl className="grid grid-cols-[30%_1fr] gap-y-2">
            <div className="body-regular-16 text-gray-3">나이</div>
            <div className="body-semi-bold-16 text-dark">{age}</div>

            <div className="body-regular-16 text-gray-3">성별</div>
            <div className="body-semi-bold-16 text-dark">{gender}</div>

            <div className="body-regular-16 text-gray-3">등급</div>
            <div className="body-semi-bold-16 text-dark">{grade}</div>

            <div className="body-regular-16 text-gray-3">인지상태</div>
            <div className="body-semi-bold-16 text-dark">{condition}</div>

            <div className="body-regular-16 text-gray-3">동거여부</div>
            <div className="whitespace-pre-line body-semi-bold-16 text-dark">
              {livingWith}
            </div>

            <div className="body-regular-16 text-gray-3">특이사항</div>
            <div className="body-semi-bold-16 text-dark">{specialNotes}</div>
          </dl>
        </div>
      </div>
    </div>
  );
};

export default SeniorInfoCard;
