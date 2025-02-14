import React from 'react';

const OptionButton = ({ label, options, selectedOption, onSelect }) => {
    return (
        <div className="flex flex-col">
            {label && <p className="text-sm text-gray-700 mb-2">{label}</p>}

            <div className="grid grid-cols-2 gap-4">
                {options.map((option) => (
                    <button
                        key={option}
                        className={`p-3 text-sm rounded border-none 
                            ${selectedOption === option 
                                ? "bg-blue-500 text-white border-blue-500"
                                : "bg-gray-200 text-black hover:bg-gray-300"
                        }`}
                        onClick={() => onSelect(option)}
                    >
                        {option}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default OptionButton;
