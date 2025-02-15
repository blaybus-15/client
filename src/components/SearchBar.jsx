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
      <div className="relative flex items-center">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={placeholder}
          className="w-full h-12 px-4 pr-12 text-gray-700 border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:border-gray-400"
        />
        <button
          type="submit"
          className="absolute p-2 text-gray-400 right-3 hover:text-gray-600 focus:outline-none"
        >
          <FiSearch size={20} />
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
