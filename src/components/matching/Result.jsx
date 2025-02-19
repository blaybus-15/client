import React from 'react';
import { Check } from 'lucide-react';

const ResultContent = ({
  title = '매칭 거절 되었습니다.',
  description = '관리자에게 거절 안내 메세지가 발송됩니다.',
  type = 'success',
}) => {
  return (
    <div className="relative w-full h-full bg-zinc-100">
      {/* Title */}
      <div className="absolute left-6 top-[100px]">
        <h1 className="text-2xl font-semibold leading-10 text-black font-pretendard">
          {title}
        </h1>
      </div>

      {/* Description */}
      <div className="absolute left-6 top-[145px]">
        <p className="text-base font-normal leading-normal font-pretendard text-neutral-600">
          {description}
        </p>
      </div>

      {/* Success Icon */}
      <div className="absolute left-[108px] top-[326px]">
        <div className="w-40 h-40 rounded-full bg-[#FFE943] flex items-center justify-center">
          <Check className="w-16 h-16 text-[#221313]" strokeWidth={3} />
        </div>
      </div>
    </div>
  );
};

export default ResultContent;
