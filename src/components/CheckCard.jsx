import React from 'react';
import { BsCheck } from 'react-icons/bs';

const CheckCard = ({ value, onChange, yesLabel = 'Yes', noLabel = 'No' }) => {
  const baseStyles =
    'flex items-center gap-2 w-full p-4 rounded-lg transition-all duration-200 cursor-pointer';
  const styles = (isSelected) =>
    isSelected
      ? 'bg-gray-200/70 text-gray-900'
      : 'bg-gray-50 text-gray-500 hover:bg-gray-100';

  const options = [
    { id: 'yes', label: yesLabel, value: true },
    { id: 'no', label: noLabel, value: false },
  ];

  return (
    <div className="space-y-2">
      <div className="flex flex-col gap-2">
        {options.map((option) => (
          <button
            key={option.id}
            className={`${baseStyles} ${styles(value === option.value)}`}
            onClick={() =>
              onChange(value === option.value ? null : option.value)
            }
          >
            <span
              className={`rounded-full p-1 ${
                value === option.value ? 'bg-gray-300' : 'bg-gray-200/50'
              }`}
            >
              <BsCheck
                size={16}
                className={
                  value === option.value ? 'text-gray-600' : 'text-gray-400'
                }
              />
            </span>
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CheckCard;
