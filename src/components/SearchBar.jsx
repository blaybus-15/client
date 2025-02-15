import React, { useState } from 'react';
import { FiSearch } from 'react-icons/fi';

const SearchBar = ({ placeholder = '검색어를 입력하세요', onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchTerm);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="relative flex items-center h-[38px] body-regular-16">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={placeholder}
          className="w-full h-full px-4 pr-12 bg-white rounded-lg placeholder-gray-2 text-dark focus:outline-none focus:shadow-inner "
        />
        <button
          type="submit"
          className="absolute p-2 text-gray-400 right-2 hover:text-gray-600 focus:outline-none"
        >
          <FiSearch size={20} className="text-gray-1" />
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
