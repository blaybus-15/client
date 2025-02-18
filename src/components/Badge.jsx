import React from 'react';

const Badge = ({
  label,
  value,
  variant = 'default',
  className = '',
  ...props
}) => {
  const baseStyle =
    'h-7 py-1 px-3 inline-flex items-center justify-center text-xs font-medium font-pretendard rounded';

  const variants = {
    // 예상 도보 스타일 (기본)
    default: 'bg-background-point border border-main',

    // 상태 배지 스타일
    pending: 'bg-sky-100 border border-sky-400 text-sky-400',
    negotiating: 'bg-rose-100 border border-red-500 text-red-500',
    completed: 'xbg-main text-stone-900 text-dark text-semibold',
  };

  // 기본 배지의 경우 label과 value의 색상을 다르게 처리
  const isDefaultVariant = variant === 'default';
  const labelColor = isDefaultVariant ? 'text-gray-1' : '';
  const valueColor = isDefaultVariant ? 'text-dark' : '';

  const variantStyle = variants[variant] || variants.default;

  return (
    <div className={`${baseStyle} ${variantStyle} ${className}`} {...props}>
      {isDefaultVariant ? (
        <>
          <span className={labelColor}>{label}</span>
          {value && <span className={valueColor}>&nbsp;{value}</span>}
        </>
      ) : (
        <span>{label}</span>
      )}
    </div>
  );
};

export default Badge;
