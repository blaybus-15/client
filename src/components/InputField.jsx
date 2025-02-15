import React from "react";

const InputField = ({ label, placeholder, type = "text", value, onChange, isInvalid, className, maxLength }) => {
    return (
        <div className={`flex flex-col mb-4  ${className}`}>
            {label && <label className="text-lg font-medium text-[#221313] mb-3">{label}</label>}
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className={`w-full px-4 py-4 text-base font-normal text-[#221313] bg-[#F3F4F5] placeholder-[#606265] border ${isInvalid ? "border-[#FF3737]" : "border-none"} 
                            rounded-xl focus:outline-none`}
                maxLength={maxLength}
            />
        </div>
    );
};

export default InputField;