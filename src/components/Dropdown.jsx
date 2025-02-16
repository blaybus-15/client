import React, { useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';

const Dropdown = ({ title, items, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(title);

  const handleSelect = (item) => {
    setSelected(item);
    setIsOpen(false);
    if (onSelect) onSelect(item);
  };

  return (
    <div className="w-full ">
      <div className="relative">
        {/* 드롭다운 버튼 */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-between w-full px-4 py-3 text-left bg-white rounded-lg body-regular-16 focus:outline-none "
        >
          <span className=" text-gray-1">{selected}</span>
          <IoIosArrowDown
            className={`transition-transform duration-200 ${
              isOpen ? 'transform rotate-180' : ''
            }`}
          />
        </button>

        {/* 드롭다운 메뉴 */}
        {isOpen && (
          <div className="absolute w-full mt-1 bg-white border rounded-lg shadow-md body-regular-16">
            {items.map((item, index) => (
              <div>
                <button
                  key={index}
                  onClick={() => handleSelect(item)}
                  className="w-full px-4 py-3 text-left hover:bg-gray-50 text-dark first:rounded-t-lg last:rounded-b-lg"
                >
                  {item}
                </button>
                <hr />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dropdown;
