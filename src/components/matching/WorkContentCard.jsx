import React from 'react';

const WorkContentCard = ({
  patientInfo = '70대 여성 어르신,\n노인성 질환 관리 필요',
  mainDuties = '어르신의 가정 방문 요양\n(일상생활 보조, 식사 준비, 목욕지원)',
}) => {
  return (
    <div className="relative w-full bg-white ">
      <div>
        <h2 className="pr-8 text-dark body-semi-bold-18">근무내용</h2>

        <div className="pt-3">
          <dl className="grid grid-cols-[30%_1fr] gap-y-2">
            <div className="body-regular-16 text-gray-3">대상자</div>
            <div className="whitespace-pre-line body-semi-bold-16 text-dark">
              {patientInfo}
            </div>

            <div className="body-regular-16 text-gray-3">주요 업무</div>
            <div className="whitespace-pre-line body-semi-bold-16 text-dark">
              {mainDuties}
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
};

export default WorkContentCard;
