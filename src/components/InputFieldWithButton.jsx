import React, { useState } from 'react';

const InputFieldWithButton = ({
  placeholder = '입력해주세요',
  buttonText = '확인',
  disabled = false,
  onSubmit = () => {},
}) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = () => {
    onSubmit(inputValue);
  };

  return (
    <div className="w-full mx-auto">
      <div className="relative rounded-lg bg-background-gray body-regular-16">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          className="w-full h-12 p-4 pr-24 bg-transparent outline-none placeholder-gray-1 text-dark "
        />
        <button
          onClick={handleSubmit}
          className="absolute px-4 py-2 text-white -translate-y-1/2 rounded-lg bg-gray-2 right-2 top-1/2 hover:bg-main hover:text-dark"
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default InputFieldWithButton;
