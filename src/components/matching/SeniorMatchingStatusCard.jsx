import React from 'react';
import Badge from '../Badge';
import defaultSeniorProfile from '../../assets/senior-profile.png';

const SeniorMatchingStatusCard = ({
  name = '한장미',
  birthDate = '1956',
  gender = '여성',
  address = '서울시 강남구 수서동',
  grade = '2등급',
  status = '대기중',
  className = '',
  photoUrl,
}) => {
  const getStatusVariant = (status) => {
    const variants = {
      대기중: 'pending',
      완료함: 'completed',
      조율중: 'negotiating',
    };
    return variants[status] || 'pending';
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return `${date.getFullYear()} / ${String(date.getMonth() + 1).padStart(2, '0')} / ${String(date.getDate()).padStart(2, '0')}`;
  };

  return (
    <div
      className={`inline-flex items-center justify-between w-full h-24 gap-4 bg-white ${className}`}
    >
      <div className="flex items-center justify-start gap-5">
        {/* Senior Photo */}
        <div className="flex items-center justify-end w-20 overflow-hidden rounded-full bg-neutral-400">
          <img
            className="object-cover w-40 h-20"
            src={photoUrl || defaultSeniorProfile}
            alt={`${name}님의 사진`}
          />
        </div>

        {/* Senior Info */}
        <div className="inline-flex flex-col items-start justify-center gap-3">
          {/* Name and Basic Info */}
          <div className="inline-flex flex-col items-start self-stretch justify-start gap-1 h-9">
            <div className="self-stretch text-base font-semibold text-stone-900 font-pretendard">
              {name}
            </div>
            <div className="self-stretch justify-start items-center gap-0.5 inline-flex">
              <div className="text-xs font-medium text-zinc-600 font-pretendard">
                {formatDate(birthDate)}
              </div>
              <div className="px-1 text-xs font-medium text-zinc-600 font-pretendard">
                ·
              </div>
              <div className="text-xs font-medium text-zinc-600 font-pretendard">
                {gender}
              </div>
            </div>
          </div>

          {/* Address and Grade */}
          <div className="inline-flex flex-col items-start self-stretch justify-start gap-1">
            <div className="inline-flex items-center self-stretch justify-start gap-3">
              <div className="text-sm font-medium leading-tight text-zinc-600 font-pretendard">
                주소
              </div>
              <div className="text-sm font-semibold leading-tight text-stone-900 font-pretendard">
                {address}
              </div>
            </div>
            <div className="inline-flex items-center justify-start gap-5">
              <div className="text-sm font-medium leading-tight text-zinc-600 font-pretendard">
                장기요양등급
              </div>
              <div className="text-sm font-semibold leading-tight text-stone-900 font-pretendard">
                {grade}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Status Badge */}
      <Badge label={status} variant={getStatusVariant(status)} />
    </div>
  );
};

export default SeniorMatchingStatusCard;
