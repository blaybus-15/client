import React from 'react';
import { FiSearch } from 'react-icons/fi';

const SearchBar = ({
  placeholder = '검색어를 입력하세요',
  value,
  onChange,
}) => {
  return (
    <div className="relative flex items-center h-[38px] body-regular-16">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full h-full px-4 pr-12 bg-white rounded-lg placeholder-gray-2 text-dark focus:outline-none focus:shadow-inner"
      />
      <div className="absolute p-2 text-gray-400 right-2">
        <FiSearch size={20} className="text-gray-1" />
      </div>
    </div>
  );
};

export default SearchBar;
