import React from 'react';
import { BsCheck } from 'react-icons/bs';

const CheckCard = ({ value, onChange, yesLabel = 'Yes', noLabel = 'No' }) => {
  const baseStyles =
    'flex items-center gap-2 w-full p-4 rounded-lg  cursor-pointer body-regular-16 text-dark';
  const styles = (isSelected) =>
    isSelected
      ? 'bg-background-point shadow-inner'
      : 'bg-background-gray hover:bg-gray-200/50';

  const options = [
    { id: 'yes', label: yesLabel, value: true },
    { id: 'no', label: noLabel, value: false },
  ];

  return (
    <div className="space-y-2">
      <div className="flex flex-col gap-[16px]">
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
                value === option.value ? 'bg-main' : 'bg-gray-2'
              }`}
            >
              <BsCheck
                size={16}
                className={value === option.value ? 'text-dark' : 'text-white'}
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
