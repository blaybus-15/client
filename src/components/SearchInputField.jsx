import React from 'react';

const SearchInputField = ({ label, placeholder = '입력해주세요', buttonText, value, onClick }) => {

    return (
        <div className="w-full mx-auto">
            <div className='flex flex-col mb-4'>
            {label && <label className="text-lg font-medium text-dark mb-3">{label}</label>}
        <div
            className="relative rounded-lg bg-background-gray body-regular-16 cursor-pointer"
            onClick={onClick}
        >
            <input
                type="text"
                placeholder={placeholder}
                value={value}
                className="w-full h-12 p-4 pr-24 bg-transparent outline-none placeholder-gray-3 text-dark cursor-pointer"
                readOnly
            />
            <button
                className="absolute px-4 py-2 -translate-y-1/2 rounded-md right-2 top-1/2 bg-main text-dark"
            >
                {buttonText}
            </button>
        </div>
        </div>
        </div>
    );
};

export default SearchInputField;

