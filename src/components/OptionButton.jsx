import React from 'react';

const OptionButton = ({ label, options, selectedOption, onSelect }) => {
    return (
        <div className="flex flex-col">
            {label && <p className="text-lg font-medium text-dark mb-3">{label}</p>}

            <div className="grid grid-cols-2 gap-4 mb-4">
                {options.map((option) => (
                    <button
                        key={option}
                        className={`px-16 py-3 text-base rounded-xl
                            ${selectedOption === option 
                                ? "bg-background-point text-dark font-semibold border border-main"
                                : "bg-[#F3F4F5] text-dark body-regular-16"
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
