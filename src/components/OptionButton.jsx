import React from 'react';

const OptionButton = ({ label, options, selectedOption, onSelect }) => {
    return (
        <div className="flex flex-col">
            {label && <p className="text-lg font-medium text-[#221313] mb-3">{label}</p>}

            <div className="grid grid-cols-2 gap-4 mb-4">
                {options.map((option) => (
                    <button
                        key={option}
                        className={`px-16 py-3 text-base rounded-xl
                            ${selectedOption === option 
                                ? "bg-[#FFFEDF] text-[#221313] font-semibold border border-[#FFE943]"
                                : "bg-[#F3F4F5] text-[#221313] font-normal"
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
