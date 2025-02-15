import React from "react";

const Button = ({ text, onClick, disabled = false, className }) => {
    
    return (
        <button
            className={
                `w-full py-4 text-[#FFFFFF] bg-[#221313] text-lg font-semibold rounded-2xl
                transition hover:bg-opacity-80 disabled:bg-[#B1B5B9] ${className}`}
            onClick={onClick}
            disabled={disabled}
        >
            {text}
        </button>
    );
};

export default Button;