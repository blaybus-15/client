import React, { useState } from 'react';

const SelectableCard = ({
  items,
  multiple = false,
  onSelect,
  className = '',
  selectedClassName = 'bg-blue-500 text-white',
  unselectedClassName = 'bg-gray-100 hover:bg-gray-200',
  cols = 2,
}) => {
  const [selected, setSelected] = useState(multiple ? [] : null);

  const handleClick = (index) => {
    if (multiple) {
      const newSelected = selected.includes(index)
        ? selected.filter((i) => i !== index)
        : [...selected, index];
      setSelected(newSelected);
      onSelect?.(newSelected);
    } else {
      const newSelected = selected === index ? null : index;
      setSelected(newSelected);
      onSelect?.(newSelected);
    }
  };

  const isSelected = (index) => {
    if (multiple) {
      return selected.includes(index);
    }
    return selected === index;
  };

  return (
    <div
      className={`grid gap-4 ${className}`}
      style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
    >
      {' '}
      {items.map((item, index) => (
        <button
          key={index}
          onClick={() => handleClick(index)}
          className={`
            p-6 rounded-lg shadow-sm
            transition-all duration-200
            text-center font-medium
            ${isSelected(index) ? selectedClassName : unselectedClassName}
          `}
        >
          {item}
        </button>
      ))}
    </div>
  );
};

export default SelectableCard;
