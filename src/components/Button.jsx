import React from "react";

const Button = ({ text, onClick, disabled = false, className }) => {
    
    return (
        <button
            className={
                `body-semi-bold-18 w-full py-4 text-[#FFFFFF] bg-dark rounded-2xl
                transition hover:bg-opacity-80 disabled:bg-gray-2 ${className}`}
            onClick={onClick}
            disabled={disabled}
        >
            {text}
        </button>
    );
};

export default Button;