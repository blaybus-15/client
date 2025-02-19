import React from 'react';

const CaregiverCard = ({
  name = '김은정',
  location = '서울시 강남구',
  birthDate = '1970-02-23',
  phone = '010-1234-5678',
  gender = '여',
  carDescription = '차량 소지',
  educationStatus = '교육 이수 완료',
}) => {
  return (
    <div className="relative w-full bg-white ">
      <div>
        <h2 className="pr-8 text-[#0081D1] body-semi-bold-18">
          {name} 요양보호사님 프로필
        </h2>

        <div className="pt-3">
          <dl className="grid grid-cols-[30%_1fr] gap-y-2">
            <div className="body-regular-16 text-gray-1">위치</div>
            <div className="body-semi-bold-16 text-dark">{location} 거주</div>

            <div className="body-regular-16 text-gray-1">생년월일</div>
            <div className="body-semi-bold-16 text-dark">{birthDate}</div>

            <div className="body-regular-16 text-gray-1">연락처</div>
            <div className="body-semi-bold-16 text-dark">{phone}</div>

            <div className="body-regular-16 text-gray-1">성별</div>
            <div className="body-semi-bold-16 text-dark">{gender}</div>

            <div className="body-regular-16 text-gray-1">차량 소지</div>
            <div className="body-semi-bold-16 text-dark">{carDescription}</div>

            <div className="body-regular-16 text-gray-1">치매 교육</div>
            <div className="body-semi-bold-16 text-dark">{educationStatus}</div>
          </dl>
        </div>
      </div>
    </div>
  );
};

export default CaregiverCard;
