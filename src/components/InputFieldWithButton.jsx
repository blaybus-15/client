import React, { useState } from 'react';

const InputFieldWithButton = ({
  placeholder = '입력해주세요',
  buttonText = '확인',
  onSubmit = () => {},
}) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = () => {
    onSubmit(inputValue);
  };

  return (
    <div className="w-full mx-auto">
      <div className="relative bg-gray-100 rounded-lg">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={placeholder}
          className="w-full h-12 p-6 pr-24 text-gray-700 placeholder-gray-500 bg-transparent outline-none"
        />
        <button
          onClick={handleSubmit}
          className="absolute px-4 py-2 text-white -translate-y-1/2 bg-gray-400 rounded-lg right-2 top-1/2 hover:bg-gray-600"
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default InputFieldWithButton;
