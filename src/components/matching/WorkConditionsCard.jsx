import React from 'react';

const WorkConditionsCard = ({
  salary = '시급 13,500원',
  workingDays = '토, 일 (주2일)',
  workType = '방문요양',
  workingHours = '오전 10시 ~ 오후 1시, 주 2회',
  workingHoursNegotiable = true,
  preferredCaregiver = '여성 요양보호사 선호',
}) => {
  return (
    <div className="relative w-full bg-white">
      <div>
        <h2 className="pr-8 text-dark body-semi-bold-18">근무조건</h2>

        <div className="pt-3">
          <dl className="grid grid-cols-[30%_1fr] gap-y-2">
            <div className="body-regular-16 text-gray-1">급여</div>
            <div className="body-semi-bold-16 text-dark">{salary}</div>

            <div className="body-regular-16 text-gray-1">근무 요일</div>
            <div className="body-semi-bold-16 text-dark">{workingDays}</div>

            <div className="body-regular-16 text-gray-1">근무 형태</div>
            <div className="body-semi-bold-16 text-dark">{workType}</div>

            <div className="body-regular-16 text-gray-1">근무 시간</div>
            <div className="body-semi-bold-16 text-dark">
              {workingHours}
              {workingHoursNegotiable && (
                <span className="ml-1">
                  <br />
                  (시간 조정 가능)
                </span>
              )}
            </div>

            <div className="body-regular-16 text-gray-1">선호 성별</div>
            <div className="body-semi-bold-16 text-dark">
              {preferredCaregiver}
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
};

export default WorkConditionsCard;
