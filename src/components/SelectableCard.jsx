import React, { useState } from 'react';

const SelectableCard = ({
  items,
  multiple = false,
  onSelect,
  className = '',
  selectedClassName = 'bg-background-point body-semi-bold-16 shadow-inner',
  unselectedClassName = 'bg-background-gray body-regular-16 hover:bg-gray-2/20',
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
      className={`grid gap-[11px] ${className}`}
      style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
    >
      {' '}
      {items.map((item, index) => (
        <button
          key={index}
          onClick={() => handleClick(index)}
          className={`
            p-6 rounded-lg text-dark
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
