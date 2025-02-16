import React from 'react';

const LimitedTextInput = ({
  value,
  onChange,
  maxLength = 300,
  placeholder = '입력해주세요.',
  className = '',
}) => {
  const handleChange = (e) => {
    const input = e.target.value;
    if (input.length <= maxLength) {
      onChange(input);
    }
  };

  return (
    <div className="w-full ">
      <div className="relative rounded-lg body-regular-16">
        <textarea
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          className={`w-full p-4 min-h-[100px] rounded-lg bg-background-gray resize-none outline-none placeholder-gray-1 text-dark ${className}`}
        />
        <div className="absolute caption-regular-14 bottom-3 right-3">
          <span className="text-red-400">{value.length}</span>
          <span className="text-gray-2">/{maxLength}</span>
        </div>
      </div>
    </div>
  );
};

export default LimitedTextInput;
