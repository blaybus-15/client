import React from 'react';

const InputFieldWithButton = ({
  placeholder = '입력해주세요',
  buttonText = '확인',
  disabled = false,
  style = 'bg-background-gray',
  value = '',
  onChange = () => {},
  onSubmit = () => {},
}) => {
  const handleSubmit = () => {
    onSubmit(value);
  };

  return (
    <div className="w-full mx-auto">
      <div className={`relative rounded-lg body-regular-16 ${style}`}>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e)}
          placeholder={placeholder}
          disabled={disabled}
          className="w-full h-12 p-4 pr-24 bg-transparent outline-none placeholder-gray-3 text-dark"
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
