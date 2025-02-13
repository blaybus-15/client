import React from "react";

const Button = ({ text, onClick, disabled = false }) => {
    
    return (
        <button
            className={`w-full py-3 text-black bg-[#E8E8E8] font-semibold 
                    hover:bg-gray-300 disabled:bg-gray-200 disabled:cursor-not-allowed`}
            onClick={onClick}
            disabled={disabled}
        >
            {text}
        </button>
    );
};

export default Button;