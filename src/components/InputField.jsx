import React from "react";

const InputField = ({ label, placeholder, type = "text", value, onChange, isInvalid, className, maxLength }) => {
    return (
        <div className={`flex flex-col mb-4  ${className}`}>
            {label && <label className="text-lg font-medium text-dark mb-3">{label}</label>}
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className={`w-full px-4 py-4 text-base font-normal text-dark bg-background-gray placeholder-gray-1 border ${isInvalid ? "border-[#FF3737]" : "border-none"} 
                            rounded-xl focus:outline-none`}
                maxLength={maxLength}
            />
        </div>
    );
};

export default InputField;