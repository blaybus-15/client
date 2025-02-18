import React from 'react';

const OptionButton = ({ label, options, selectedOption, onSelect, className }) => {
    return (
        <div className={`flex flex-col ${className}`}>
            {label && <p className="body-medium-18 text-dark mb-3">{label}</p>}

            <div className="grid grid-cols-2 gap-3">
                {options.map(({ label, value }) => (
                    <button
                        key={value}
                        type="button"
                        className={`px-16 py-3 text-base rounded-xl
                            ${selectedOption === value 
                                ? "bg-background-point text-dark font-semibold shadow-inner"
                                : "bg-background-gray text-dark body-regular-16"
                        }`}
                        onClick={() => onSelect(value)}
                    >
                        {label}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default OptionButton;
