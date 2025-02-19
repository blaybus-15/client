import React from 'react';
import CheckIcon from '../../../assets/check-icon.svg';

const ResultPage = ({ type = 'accept', message, subMessage }) => {
  const getDefaultMessages = () => {
    if (type === 'accept') {
      return {
        message: '매칭 전달 되었습니다.',
        subMessage: '보호사에게 매칭 안내 메세지가 발송됩니다.',
      };
    } else if (type === 'reject') {
      return {
        message: '매칭 거절 되었습니다.',
        subMessage: '관리자에게 거절 안내 메세지가 발송됩니다.',
      };
    } else {
      return {
        message: '근무 내용 조율 요청 되었습니다.',
        subMessage: '관리자에게 조율 요청 메세지가 발송됩니다.',
      };
    }
  };

  const defaultMessages = getDefaultMessages();
  const mainMessage = message || defaultMessages.message;
  const secondaryMessage = subMessage || defaultMessages.subMessage;

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* 메시지 영역 */}
      <div className="flex flex-col items-start flex-1 px-6 sm:px-20">
        <div className="mt-28 sm:mt-[140px] mb-12">
          <h1 className="text-left whitespace-pre-line head-semi-bold-24">
            {mainMessage}
          </h1>
          <p className="mt-4 text-left whitespace-pre-line body-regular-16 text-neutral-600">
            {secondaryMessage}
          </p>
        </div>

        {/* 체크 아이콘 */}
        <img
          src={CheckIcon}
          alt="체크 아이콘"
          className="w-40 h-40 mx-auto mt-12 mb-4 sm:mt-20"
        />
      </div>
    </div>
  );
};

export default ResultPage;
