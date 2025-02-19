import React, { useState, useEffect, useRef } from 'react';

const LimitedTextInput = ({
  value,
  onChange,
  maxLength = 300,
  placeholder = '입력해주세요.',
  className = '',
}) => {
  const textAreaRef = useRef(null);
  const [rows, setRows] = useState(1);

  useEffect(() => {
    const textAreaLineHeight = 24;
    const previousRows = textAreaRef.current.rows;
    textAreaRef.current.rows = 1;
    const currentRows = Math.floor(
      textAreaRef.current.scrollHeight / textAreaLineHeight
    );

    if (currentRows === previousRows) {
      textAreaRef.current.rows = currentRows;
    }

    setRows(currentRows);
  }, [value]);

  const handleChange = (e) => {
    const input = e.target.value;
    if (input.length <= maxLength) {
      onChange(input);
    }
  };

  return (
    <div className="w-full">
      <div className="relative rounded-lg body-regular-16">
        <textarea
          ref={textAreaRef}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          rows={rows}
          className={`w-full p-4 rounded-lg bg-background-gray resize-none outline-none placeholder-gray-3 text-dark ${className}`}
        />
        <div className="absolute caption-regular-14 bottom-3 right-3">
          <span className="text-red">{value.length}</span>
          <span className="text-gray-2">/{maxLength}</span>
        </div>
      </div>
    </div>
  );
};

export default LimitedTextInput;
